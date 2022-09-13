import {
  DateType,
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RefreshTokenRepository } from './refresh-token.repository';

@Entity({ customRepository: () => RefreshTokenRepository })
export class RefreshTokenEntity {
  [EntityRepositoryType]?: RefreshTokenRepository;

  @PrimaryKey()
  id: number;

  @Index()
  @Property()
  @Unique()
  value: string;

  @ManyToOne()
  user!: User;

  @Property({ type: DateType, nullable: true })
  expiresAt: Date;
}
