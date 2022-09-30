import {
  BaseEntity,
  BeforeCreate,
  BeforeUpdate,
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  Index,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UserRepository } from './user.repository';
import { v4 } from 'uuid';
import argon from 'argon2';
import slug from 'slug';
import { AuthRole } from '../types/auth-role.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import z from 'zod';
import { TimestampedEntity } from '../../../database';

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  authRole: z.nativeEnum(AuthRole),
});

@Entity({ customRepository: () => UserRepository })
export class User extends TimestampedEntity {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id = v4();

  @Index()
  @Unique()
  @Property()
  username: string;

  @Index()
  @Unique()
  @Property()
  slug: string;

  @Index()
  @Unique()
  @Property()
  email: string;

  @Property({ hidden: true })
  private password?: string;

  //override default behaviour
  @Property()
  updatedAt = new Date();

  @Property()
  lastLoggedInAt?: Date = null;

  @Property()
  lastLogout?: Date = null;

  @OneToMany(() => RefreshTokenEntity, (token) => token.user, {
    hidden: true,
    cascade: [Cascade.ALL],
  })
  refreshTokens = new Collection<RefreshTokenEntity>(this);

  @Property()
  authRole: AuthRole = AuthRole.User;

  @Property()
  emailVerified = false;

  async changePassword(newPassword) {
    this.password = await argon.hash(newPassword);
  }

  onUpdate() {
    this.updatedAt = new Date();
  }

  onLoginSuccess() {
    this.lastLoggedInAt = new Date();
  }

  onLogout() {
    this.lastLogout = new Date();
  }

  async comparePassword(plainPassword) {
    return await argon.verify(this.password, plainPassword);
  }

  private async hashPassword() {
    this.password = await argon.hash(this.password);
  }

  @BeforeCreate()
  private async applyPasswordRules() {
    await this.hashPassword();
  }

  @BeforeCreate()
  @BeforeUpdate()
  private async slugifyUsername() {
    this.slug = slug(this.username);
  }
}
