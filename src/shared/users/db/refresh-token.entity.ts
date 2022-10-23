import {
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { RefreshTokenRepository } from './refresh-token.repository';
import { TimestampedEntity } from '@database/index';

@Entity({ customRepository: () => RefreshTokenRepository })
export class RefreshTokenEntity extends TimestampedEntity {
  [EntityRepositoryType]?: RefreshTokenRepository;

  @PrimaryKey()
  id: number;

  @Index()
  @Property()
  @Unique()
  value: string;

  @ManyToOne()
  user!: User;

  @Property({ nullable: true })
  expiresAt: Date;
}
