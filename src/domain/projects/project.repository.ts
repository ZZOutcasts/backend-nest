import { EntityRepository } from '@mikro-orm/postgresql';
import { Project } from './project.entity';
import { Technology } from '../technologies/technology.entity';
import { DeveloperRole } from '../developer-roles/developer-role.entity';

export class ProjectRepository extends EntityRepository<Project> {
  public async getProjectByName(name: string): Promise<Project> {
    return this.findOneOrFail({ name });
  }

  public async searchProjectsByName(name: string): Promise<Project[]> {
    return this.find({ name: { $re: name } });
  }

  public async getProjectsByTechnologies(
    technologies: Technology[],
  ): Promise<Project[]> {
    return this.find({ techStack: { $in: technologies } });
  }

  public async getProjectsByRoles(roles: DeveloperRole[]): Promise<Project[]> {
    return this.find({ roles: { $in: roles } });
  }
}
