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
import { DeveloperRoleRepository } from './developer-role.repository';
import { TimestampedEntity } from '../../database';
import { Project } from '../projects/project.entity';
import { ProjectMember } from '../projects/project-member.entity';
import { DeveloperRoleId, DeveloperRoleName } from './types';

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
  id: DeveloperRoleId;

  @Index()
  @Unique()
  @Property()
  name: DeveloperRoleName;

  @Property()
  icon: string;

  @Property()
  description: string;

  @ManyToMany(() => Project, (project) => project.roles)
  projects = new Collection<Project>(this);

  @ManyToMany(() => ProjectMember, (member) => member.roles)
  projectMembers = new Collection<ProjectMember>(this);
}
