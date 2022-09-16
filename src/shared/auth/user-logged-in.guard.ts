import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CookieNames,
  JwtAtPayload,
  JwtRtPayload,
  RefreshToken,
  TokenPair,
} from '../types';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { AuthService } from './auth.service';
import { TokensService } from './tokens.service';

@Injectable()
export class UserLoggedInGuard implements CanActivate {
  constructor(
    @OgmaLogger(UserLoggedInGuard) private readonly logger: OgmaService,
    private readonly tokensService: TokensService,
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtAtPayload }>();
    const cookies = request.cookies;
    const atCookie = cookies.get(CookieNames.AT_COOKIE);
    const rtCookie = cookies.get(CookieNames.RT_COOKIE);

    let atPayload: JwtAtPayload;
    let rtPayload: JwtRtPayload;
    try {
      // check if access token is valid
      atPayload = await this.tokensService.checkToken<JwtAtPayload>(atCookie);
      // set metadata on request
      request.user = atPayload;
      // pass to next handler
      return true;
    } catch (err) {
      if (err.name !== 'TokenExpiredError') {
        this.logger.info(`Access Token Error: ${err}`);
        return false;
      }
      //if access token is expired, check if refresh token is valid
      try {
        //if refresh token is valid, then we will exchange rt for a fresh at and rt
        rtPayload = await this.tokensService.checkToken<JwtRtPayload>(rtCookie);
      } catch (err2) {
        if (err2.name !== 'TokenExpiredError') {
          this.logger.info(`Refresh Token Error: ${err2}`);
          return false;
        }
      }
    }
    // we arrive here, if we got an expired At and valid Rt
    // we will obtain new token pair and proceed with the request
    const { accessToken, refreshToken } = await this.authService
      .exchangeRtForTokenPair(rtPayload, rtCookie)
      .catch((err) => {
        this.logger.error(err);
        throw new UnauthorizedException();
      });

    // set new cookies on response object
    const response = context.switchToHttp().getResponse<Response>();
    response.cookie(CookieNames.AT_COOKIE, accessToken, { httpOnly: true });
    response.cookie(CookieNames.RT_COOKIE, refreshToken, { httpOnly: true });

    return true;
  }
}
