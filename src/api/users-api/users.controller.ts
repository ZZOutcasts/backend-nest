import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
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
import { UserLoggedInGuard } from '../../shared/users/guards';
import { AuthRole } from '../../shared/users/types/auth-role.enum';
import { AdminGuard } from '../../shared/users/guards/admin.guard';

@Controller('users-api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  public async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }

  @UseGuards(UserLoggedInGuard)
  @Get()
  public async getLoggedInUser(@AuthUser() { sub }: JwtAtPayload) {
    return await this.usersService.getUserById(sub);
  }

  @Get(':slug')
  public async getUserBySlug(@Param('slug') slug: string) {
    return await this.usersService.getUserBySlug(slug);
  }

  @UseGuards(UserLoggedInGuard)
  @Put(':id')
  public async updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: JwtAtPayload,
  ) {
    this.checkIsOwnerOrAdmin(userId, authUser);

    return await this.usersService.updateUser(userId, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Put(':id/authRole')
  public async changeAuthRole(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() { authRole }: ChangeAuthRoleDto,
  ) {
    return await this.usersService.updateUserRole(userId, authRole);
  }

  @UseGuards(UserLoggedInGuard)
  @Put(':id/password')
  public async changePassword(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @AuthUser() authUser: JwtAtPayload,
  ) {
    this.checkIsOwner(userId, authUser);
    return await this.usersService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(UserLoggedInGuard)
  @Delete(':id')
  public async deleteUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @AuthUser() authUser: JwtAtPayload,
  ) {
    this.checkIsOwner(userId, authUser);
    return await this.usersService.deleteUser(userId);
  }

  private checkIsOwnerOrAdmin(
    userId: string,
    authUser: JwtAtPayload,
  ): void | never {
    const isOwnerOrAdmin =
      authUser.sub === userId || authUser.authRole === AuthRole.Administrator;

    if (!isOwnerOrAdmin) throw new UnauthorizedException();
  }

  private checkIsOwner(userId: string, authUser: JwtAtPayload): void | never {
    const isOwner = authUser.sub === userId;
    if (!isOwner) throw new UnauthorizedException();
  }
}
