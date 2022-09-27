import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import ms from 'ms';
import {
  JwtRtPayload,
  RefreshToken,
  TokenPair,
  TokenPairWithPayload,
} from '../../types';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../../config';
import { TokensService } from './tokens.service';
import { RefreshTokenRepository, User, UserRepository } from '../db';
import { LoginWithEmailDto, LoginWithUsernameDto } from '../dto';

@Injectable()
export class AuthService {
  private readonly rtValidityPeriod: number = ms(
    this.configService.get(JwtConfig.RtExpiration),
  );

  constructor(
    @OgmaLogger(AuthService) private readonly logger: OgmaService,
    private readonly usersRepository: UserRepository,
    private readonly rtRepository: RefreshTokenRepository,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
  ) {}

  public async authenticateWithUsername({
    username,
    password,
  }: LoginWithUsernameDto): Promise<User | never> {
    const foundUser = await this.usersRepository
      .findByUsername(username)
      .catch((err) => {
        this.logger.debug(err);
        throw new UnauthorizedException();
      });

    if (!(await foundUser.comparePassword(password))) {
      throw new UnauthorizedException();
    }

    foundUser.onLoginSuccess();
    await this.usersRepository.persistAndFlush(foundUser);

    return foundUser;
  }

  public async authenticateWithEmail({
    email,
    password,
  }: LoginWithEmailDto): Promise<User | never> {
    const foundUser = await this.usersRepository
      .findByEmail(email)
      .catch((err) => {
        this.logger.debug(err);
        throw new UnauthorizedException();
      });

    if (!(await foundUser.comparePassword(password))) {
      throw new UnauthorizedException();
    }

    foundUser.onLoginSuccess();
    await this.usersRepository.persistAndFlush(foundUser);

    return foundUser;
  }

  public async getTokensForUser(user: User): Promise<TokenPair> {
    return await this.tokensService.generateTokens(user);
  }

  public async logout(userId: string) {
    const user = await this.usersRepository.findById(userId);
    await this.rtRepository.nativeDelete({ user: { id: userId } });
    user.onLogout();
    await this.usersRepository.persistAndFlush(user);
  }

  public async exchangeRtForTokenPair(
    rt: JwtRtPayload,
    rawRt: RefreshToken,
  ): Promise<TokenPairWithPayload> {
    const foundRt = await this.rtRepository.findByValue(rawRt).catch((err) => {
      this.logger.warn(err);
      this.logger.warn(`Did not find refresh token from request`);
      this.logger.warn(rt);
      throw new UnauthorizedException();
    });

    if (foundRt.user.id !== rt.sub) {
      this.logger.error(
        `Got refresh token: ${rt} for incorrect user: ${foundRt.user}`,
      );
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken, payload } =
      await this.tokensService.generateTokens(foundRt.user);

    await this.rtRepository.updateRefreshToken({
      oldRt: foundRt,
      newRt: refreshToken,
      validityPeriod: this.rtValidityPeriod,
    });

    return { accessToken, refreshToken, payload };
  }

  public async saveRtForUser(rt: RefreshToken, user: User) {
    const newRt = this.rtRepository.create({
      value: rt,
      user,
      expiresAt: new Date(Date.now() + this.rtValidityPeriod),
    });
    await this.rtRepository.persistAndFlush(newRt);
  }
}
