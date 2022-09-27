import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtAtPayload } from '../types';

export const AuthUser = createParamDecorator(
  (data, ctx: ExecutionContext): JwtAtPayload => {
    return ctx.switchToHttp().getRequest().user;
  },
);
