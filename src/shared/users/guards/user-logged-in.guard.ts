import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CookieNames, JwtAtPayload, JwtRtPayload } from '../../types';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { AuthService, TokensService } from '../services';

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
    const atRaw = cookies[CookieNames.AT_COOKIE];
    const rtRaw = cookies[CookieNames.RT_COOKIE];

    const atPayload = await this.tokensService
      .checkToken<JwtAtPayload>(atRaw)
      .catch((err) => {
        this.logger.debug(err);
        if (err.name !== 'TokenExpiredError') {
          this.logger.debug(`Other reason for rejecting token`);
          throw new UnauthorizedException();
        }
      });

    if (atPayload) {
      request.user = atPayload;
      return true;
    }

    const rtPayload = await this.tokensService
      .checkToken<JwtRtPayload>(rtRaw)
      .catch((err) => {
        this.logger.debug(err);
        throw new UnauthorizedException();
      });

    const { accessToken, refreshToken, payload } =
      await this.authService.exchangeRtForTokenPair(rtPayload, rtRaw);

    // set new cookies on response object
    const response = context.switchToHttp().getResponse<Response>();
    response
      .cookie(CookieNames.AT_COOKIE, accessToken, { httpOnly: true })
      .cookie(CookieNames.RT_COOKIE, refreshToken, { httpOnly: true });

    // set new user on request
    request.user = payload;

    return true;
  }
}
