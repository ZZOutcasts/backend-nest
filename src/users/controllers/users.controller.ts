import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  public async register() {
    throw new NotImplementedException();
  }

  @Get()
  public async getLoggedInUser() {
    throw new NotImplementedException();
  }

  @Get(':slug')
  public async getUserBySlug() {
    throw new NotImplementedException();
  }

  @Put(':id')
  public async updateUser() {
    throw new NotImplementedException();
  }

  @Delete(':id')
  public async deleteUser() {
    throw new NotImplementedException();
  }
}
