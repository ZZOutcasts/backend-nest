import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ProjectRepository } from './project.repository';
import { ProjectMemberRepository } from './project-member.repository';
import { User } from '../../shared/users/db';
import { CreateProjectHydratedDto } from './dto';
import { ProjectStatus } from './project-status.enum';

@Injectable()
export class ProjectsManagementService {
  constructor(
    @OgmaLogger(ProjectsManagementService) private readonly logger: OgmaService,
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

  public async updateProjectStatus(id: number, newStatus: ProjectStatus) {
    const project = await this.projectsRepository.getProjectById(id);
    project.status = newStatus;
    await this.projectsRepository.persistAndFlush(project);
    return project;
  }

  public async updateProjectCapacity(id: number, newCapacity: number) {
    const project = await this.projectsRepository.getProjectById(id);
    project.capacity = newCapacity;
    await this.projectsRepository.persistAndFlush(project);
    return project;
  }

  public async softDeleteProject(id: number) {
    const project = await this.projectsRepository.getProjectById(id);
    project.softDelete();
    return await this.projectsRepository.persistAndFlush(project);
  }

  public async restoreProject(id: number) {
    const project = await this.projectsRepository.getDeletedProjectById(id);
    project.restore();
    await this.projectsRepository.persistAndFlush(project);
    return project;
  }

  public async hardDeleteProject(id: number) {
    return await this.projectsRepository.nativeDelete({ id });
  }
}
