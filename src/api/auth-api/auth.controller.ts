import {
  Controller,
  Delete,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../shared/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login() {
    throw new NotImplementedException();
  }

  @Delete()
  public async logout() {
    throw new NotImplementedException();
  }
}
