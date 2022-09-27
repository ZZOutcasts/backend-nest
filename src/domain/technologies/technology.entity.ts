import {
  Entity,
  EntityRepositoryType,
  Index,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import * as z from 'zod';
import { TechnologyRepository } from './technology.repository';
import { TimestampedEntity } from '../../database';

export const TechnologySchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  icon: z.string().min(1),
  description: z.string().optional(),
});

@Entity({ customRepository: () => TechnologyRepository })
export class Technology extends TimestampedEntity {
  [EntityRepositoryType]?: TechnologyRepository;

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
