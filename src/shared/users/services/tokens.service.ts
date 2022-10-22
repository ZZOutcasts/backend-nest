import { Injectable } from '@nestjs/common';
import { User } from '../db';
import { JwtService } from '@nestjs/jwt';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@config/enums';
import {
  AccessTokenWithPayload,
  JwtAtPayload,
  JwtRtPayload,
  RefreshToken,
  TokenPairWithPayload,
} from '@shared/types';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @OgmaLogger(TokensService) private readonly logger: OgmaService,
  ) {}

  public async generateTokens(user: User): Promise<TokenPairWithPayload> {
    const [{ accessToken, payload }, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return { accessToken, refreshToken, payload };
  }

  public async checkToken<T extends JwtAtPayload | JwtRtPayload>(
    token: string,
  ): Promise<T | null> {
    return await this.jwtService.verifyAsync<T>(token);
  }

  private async generateAccessToken(
    user: User,
  ): Promise<AccessTokenWithPayload> {
    const jwtPayload: JwtAtPayload = {
      sub: user.id,
      authRole: user.authRole,
      verified: user.emailVerified,
    };

    this.logger.debug(user);
    this.logger.debug(jwtPayload);

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: this.configService.get(JwtConfig.AtExpiration),
    });

    return { accessToken, payload: jwtPayload };
  }

  private async generateRefreshToken(user: User): Promise<RefreshToken> {
    const jwtPayload: JwtRtPayload = {
      sub: user.id,
    };

    return await this.jwtService.signAsync(jwtPayload, {
      expiresIn: this.configService.get(JwtConfig.RtExpiration),
    });
  }
}
