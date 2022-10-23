import {
  Collection,
  Entity,
  EntityRepositoryType,
  Index,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import * as z from 'zod';
import { TechnologyRepository } from './technology.repository';
import { TimestampedEntity } from '@database/index';
import { Project } from '../projects/project.entity';
import { ProjectMember } from '../projects/project-member.entity';
import { TechnologyId, TechnologyName } from './types';

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
  id: TechnologyId;

  @Index()
  @Unique()
  @Property()
  name: TechnologyName;

  @Property()
  icon: string;

  @Property()
  description: string;

  @ManyToMany(() => Project, (project) => project.techStack)
  projects = new Collection<Project>(this);

  @ManyToMany(() => ProjectMember, (member) => member.techStack)
  projectMembers = new Collection<ProjectMember>(this);
}
