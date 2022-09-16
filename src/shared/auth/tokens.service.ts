import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../config';
import {
  AccessToken,
  JwtAtPayload,
  JwtRtPayload,
  RefreshToken,
  TokenPair,
} from '../types';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @OgmaLogger(TokensService) private readonly logger: OgmaService,
  ) {}

  public async generateTokens(user: User): Promise<TokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return { accessToken, refreshToken };
  }

  public async checkToken<T extends JwtAtPayload | JwtRtPayload>(
    token: string,
  ): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token);
  }

  private async generateAccessToken(user: User): Promise<AccessToken> {
    const jwtPayload: JwtAtPayload = {
      sub: user.id,
      authRole: user.authRole,
      verified: user.emailVerified,
    };

    return await this.jwtService.signAsync(jwtPayload, {
      expiresIn: this.configService.get(JwtConfig.AtExpiration),
    });
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
