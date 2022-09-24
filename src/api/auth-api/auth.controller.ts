import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../shared/users/services';
import { LoginDto } from '../../shared/users/dto';
import { User } from '../../shared/users/db';
import { Response } from 'express';
import { CookieNames, JwtAtPayload } from '../../shared/types';
import { AuthUser } from '../../shared/decorators';
import { UserLoggedInGuard } from '../../shared/users/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(
    @Body() { username, email, password }: LoginDto,
    @Res() res: Response,
  ) {
    let user: User;
    if (!username && !email) {
      throw new BadRequestException();
    } else if (username) {
      user = await this.authService.authenticateWithUsername({
        username,
        password,
      });
    } else if (email) {
      user = await this.authService.authenticateWithEmail({ email, password });
    }

    const { accessToken, refreshToken } =
      await this.authService.getTokensForUser(user);

    res
      .cookie(CookieNames.AT_COOKIE, accessToken, { httpOnly: true })
      .cookie(CookieNames.RT_COOKIE, refreshToken, { httpOnly: true });
  }

  @UseGuards(UserLoggedInGuard)
  @Delete()
  public async logout(@Res() res: Response, @AuthUser() { sub }: JwtAtPayload) {
    await this.authService.logout(sub);
    res.clearCookie(CookieNames.AT_COOKIE).clearCookie(CookieNames.RT_COOKIE);
  }
}
