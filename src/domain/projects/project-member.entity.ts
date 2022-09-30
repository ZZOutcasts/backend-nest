import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { TimestampedEntity } from '../../database';
import { ProjectMemberRepository } from './project-member.repository';
import { Project } from './project.entity';
import { User } from '../../shared/users/db';
import { Technology } from '../technologies/technology.entity';
import { DeveloperRole } from '../developer-roles/developer-role.entity';
import z from 'zod';

export const ProjectMemberSchema = z.object({});

@Entity({ customRepository: () => ProjectMemberRepository })
export class ProjectMember extends TimestampedEntity {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  user!: User;

  @ManyToOne()
  project!: Project;

  @Property()
  isLeader: boolean;

  @Property()
  isManager: boolean;

  @ManyToMany(() => Technology, 'projectMembers', { owner: true })
  techStack = new Collection<Technology>(this);

  @ManyToMany(() => DeveloperRole, 'projectMembers', { owner: true })
  roles = new Collection<DeveloperRole>(this);
}
