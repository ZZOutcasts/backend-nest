import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import ms from 'ms';
import { JwtRtPayload, RefreshToken, TokenPair } from '../types';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../config';
import { TokensService } from './tokens.service';
import { RefreshTokenService } from '../users/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    @OgmaLogger(AuthService) private readonly logger: OgmaService,
    private readonly rtService: RefreshTokenService,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
  ) {}

  public async login() {
    throw new NotImplementedException();
  }

  public async logout() {
    // TODO delete all refresh tokens belonging to user from database
    throw new NotImplementedException();
  }

  public async exchangeRtForTokenPair(
    rt: JwtRtPayload,
    rawRt: RefreshToken,
  ): Promise<TokenPair> {
    const foundRt = await this.rtService.getTokenByValue(rawRt).catch((err) => {
      this.logger.info(err);
      throw new UnauthorizedException();
    });

    if (foundRt.user.id !== rt.sub) {
      this.logger.error(
        `Got refresh token for incorrect user: ${foundRt.user}`,
      );
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } =
      await this.tokensService.generateTokens(foundRt.user);

    const rtValidityPeriod = ms(this.configService.get(JwtConfig.RtExpiration));

    await this.rtService.overrideRefreshToken({
      oldRt: foundRt,
      newRt: refreshToken,
      validityPeriod: rtValidityPeriod,
    });

    return { accessToken, refreshToken };
  }
}
