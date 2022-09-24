import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../../shared/users/services';
import {
  ChangeAuthRoleDto,
  ChangePasswordDto,
  RegisterDto,
  UpdateUserDto,
} from '../../shared/users/dto';
import { AuthUser } from '../../shared/decorators';
import { JwtAtPayload } from '../../shared/types';

@Controller('users-api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  public async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }

  @Get()
  public async getLoggedInUser(@AuthUser() { sub }: JwtAtPayload) {
    return await this.usersService.getUserById(sub);
  }

  @Get(':slug')
  public async getUserBySlug(@Param('slug') slug: string) {
    return await this.usersService.getUserBySlug(slug);
  }

  @Put(':id')
  public async updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }

  @Put(':id/authRole')
  public async changeAuthRole(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() { authRole }: ChangeAuthRoleDto,
  ) {
    return await this.usersService.updateUserRole(userId, authRole);
  }

  @Put(':id/password')
  public async changePassword(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.usersService.changePassword(userId, changePasswordDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id', ParseUUIDPipe) userId: string) {
    return await this.usersService.deleteUser(userId);
  }
}
