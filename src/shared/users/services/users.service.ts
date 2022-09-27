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
    const user = await this.usersRepository.findById(id);
    return await this.usersRepository.removeAndFlush(user);
  }

  public async updateUserRole(id: string, newRole: AuthRole) {
    const user = await this.usersRepository.findById(id);
    user.authRole = newRole;
    user.onUpdate();
    await this.usersRepository.persistAndFlush(user);
  }

  public async changePassword(id: string, { password }: ChangePasswordDto) {
    const user = await this.usersRepository.findById(id);
    await user.changePassword(password);
    user.onUpdate();
    await this.usersRepository.persistAndFlush(user);
  }

  public async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);
    this.usersRepository.assign(user, data);
    user.onUpdate();
    return await this.usersRepository.persistAndFlush(user);
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  async getUserBySlug(slug: string) {
    return await this.usersRepository.findBySlug(slug);
  }
}
