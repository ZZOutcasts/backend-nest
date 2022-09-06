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

export const DeveloperRoleSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  avatarUrl: z.string().min(1),
  description: z.string().optional(),
});

@Entity({ customRepository: () => DeveloperRoleRepository })
export class DeveloperRole {
  [EntityRepositoryType]?: DeveloperRoleRepository;

  @PrimaryKey()
  id: number;

  @Index()
  @Unique()
  @Property()
  name: string;

  @Property()
  avatarUrl: string;

  @Property()
  description: string;
}
