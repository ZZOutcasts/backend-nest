import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '../db';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ChangePasswordDto, RegisterDto, UpdateUserDto } from '../dto';
import { AuthRole } from '../types/auth-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @OgmaLogger(UsersService) private readonly logger: OgmaService,
    private readonly usersRepository: UserRepository,
  ) {}

  public async register(data: RegisterDto) {
    const newUser = this.usersRepository.create({
      ...data,
      authRole: AuthRole.User,
    });

    return await this.usersRepository.persistAndFlush(newUser);
  }

  public async deleteUser(id: string) {
    return await this.usersRepository.nativeDelete({ id });
  }

  public async updateUserRole(id: string, newRole: AuthRole) {
    const user = await this.usersRepository.findById(id);
    user.authRole = newRole;
    await this.usersRepository.persistAndFlush(user);
  }

  public async changePassword(id: string, { newPassword }: ChangePasswordDto) {
    const user = await this.usersRepository.findById(id);
    await user.changePassword(newPassword);
    await this.usersRepository.persistAndFlush(user);
  }

  public async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);
    this.usersRepository.assign(user, data);
    return await this.usersRepository.persistAndFlush(user);
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  async getUserBySlug(slug: string) {
    return await this.usersRepository.findBySlug(slug);
  }
}
