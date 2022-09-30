import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ProjectRepository } from './project.repository';
import { ProjectMemberRepository } from './project-member.repository';
import { User } from '../../shared/users/db';
import { CreateProjectHydratedDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(
    @OgmaLogger(ProjectsService) private readonly logger: OgmaService,
    private readonly projectsRepository: ProjectRepository,
    private readonly projectMembersRepository: ProjectMemberRepository,
  ) {}

  public async createProject(
    createProjectDto: CreateProjectHydratedDto,
    leader: User,
  ) {
    const project = this.projectsRepository.create({ ...createProjectDto });
    const owner = this.projectMembersRepository.create({
      user: leader,
      isLeader: true,
      isManager: true,
    });
    project.members.add(owner);

    await this.projectsRepository.persistAndFlush(project);

    return project;
  }
}
