import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@shared/users/services';
import {
  ChangeAuthRoleDto,
  ChangePasswordDto,
  RegisterDto,
  UpdateUserDto,
} from '@shared/users/dto';
import { AuthUser } from '@shared/decorators';
import { JwtAtPayload } from '@shared/types';
import { UserLoggedInGuard } from '@shared/users/guards';
import { AuthRole } from '@shared/users/types/auth-role.enum';
import { AdminGuard } from '@shared/users/guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @OgmaLogger(UsersController) private readonly logger: OgmaService,
    private readonly usersService: UsersService,
  ) {}

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
    this.logger.debug(authUser);
    const isOwnerOrAdmin = this.checkIsOwnerOrAdmin(userId, authUser);

    if (!isOwnerOrAdmin) throw new ForbiddenException();

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
    const isOwner = this.checkIsOwner(userId, authUser);
    if (!isOwner) throw new ForbiddenException();
    return await this.usersService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(UserLoggedInGuard)
  @Delete(':id')
  public async deleteUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @AuthUser() authUser: JwtAtPayload,
  ) {
    const isOWner = this.checkIsOwner(userId, authUser);
    if (!isOWner) throw new ForbiddenException();
    return await this.usersService.deleteUser(userId);
  }

  private checkIsOwnerOrAdmin(userId: string, authUser: JwtAtPayload): boolean {
    return this.checkIsOwner(userId, authUser) || this.checkIsAdmin(authUser);
  }

  private checkIsAdmin(authUser: JwtAtPayload): boolean {
    return authUser.authRole === AuthRole.Administrator;
  }

  private checkIsOwner(userId: string, authUser: JwtAtPayload): boolean {
    return userId === authUser.sub;
  }
}
