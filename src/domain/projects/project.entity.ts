import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { SoftDeleteTimestampedEntity, WithSoftDelete } from '../../database';
import { ProjectRepository } from './project.repository';
import {
  Technology,
  TechnologySchema,
} from '../technologies/technology.entity';
import {
  DeveloperRole,
  DeveloperRoleSchema,
} from '../developer-roles/developer-role.entity';
import { ProjectStatus } from './project-status.enum';
import z from 'zod';
import { ProjectMember, ProjectMemberSchema } from './project-member.entity';

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  hits: z.number(),
  capacity: z.number(),
  status: z.nativeEnum(ProjectStatus),
  techStack: z.array(TechnologySchema),
  roles: z.array(DeveloperRoleSchema),
  members: z.array(ProjectMemberSchema),
});

@WithSoftDelete()
@Entity({ customRepository: () => ProjectRepository })
export class Project extends SoftDeleteTimestampedEntity {
  [EntityRepositoryType]?: ProjectRepository;

  @PrimaryKey()
  id: number;

  @Property()
  @Index()
  @Unique()
  name: string;

  @Property()
  description?: string;

  @Property()
  hits = 0;

  @Property()
  capacity: number;

  @Property()
  status: ProjectStatus;

  @ManyToMany(() => Technology, 'projects', { owner: true })
  techStack = new Collection<Technology>(this);

  @ManyToMany(() => DeveloperRole, 'projects', { owner: true })
  roles = new Collection<DeveloperRole>(this);

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project, {
    cascade: [Cascade.ALL],
  })
  members = new Collection<ProjectMember>(this);

  public async getLeader(): Promise<ProjectMember> {
    const found = await this.members.matching({
      where: { isLeader: true },
      limit: 1,
    });

    return found[0];
  }

  public async getManagers(): Promise<ProjectMember[]> {
    return this.members.matching({ where: { isManager: true } });
  }

  public async transferLeadership(newLeader: ProjectMember) {
    let members;
    if (!this.members.isInitialized()) {
      members = await this.members.init();
    } else {
      members = this.members;
    }
    for (const member of members) {
      member.isLeader = false;
      if (member.id === newLeader.id) {
        member.isLeader = true;
        member.isManager = true;
      }
    }
  }
}
