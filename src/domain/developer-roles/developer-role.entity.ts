import {
  Entity,
  EntityRepositoryType,
  Index,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import * as z from 'zod';
import { DeveloperRoleRepository } from './developer-role.repository';
import { TimestampedEntity } from '../../database';

export const DeveloperRoleSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  icon: z.string().min(1),
  description: z.string().optional(),
});

@Entity({ customRepository: () => DeveloperRoleRepository })
export class DeveloperRole extends TimestampedEntity {
  [EntityRepositoryType]?: DeveloperRoleRepository;

  @PrimaryKey()
  id: number;

  @Index()
  @Unique()
  @Property()
  name: string;

  @Property()
  icon: string;

  @Property()
  description: string;
}
