import { EntityRepository } from '@mikro-orm/postgresql';
import { ProjectMember } from './project-member.entity';

export class ProjectMemberRepository extends EntityRepository<ProjectMember> {}
