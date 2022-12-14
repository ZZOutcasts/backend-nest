import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAtPayload } from '../../types';
import { AuthRole } from '../types';
import { UserLoggedInGuard } from './user-logged-in.guard';

@Injectable()
export class AdminGuard extends UserLoggedInGuard implements CanActivate {
  public async canActivate(context: ExecutionContext) {
    const isLoggedIn = await super.canActivate(context);

    if (!isLoggedIn) {
      return false;
    }

    const req = context
      .switchToHttp()
      .getRequest<Request & { user: JwtAtPayload }>();
    const user = req.user;

    if (user.authRole !== AuthRole.Administrator) {
      throw new ForbiddenException();
    }

    return true;
  }
}
