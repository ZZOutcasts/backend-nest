import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ProjectRepository } from './project.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  IncludeDeletedQueryParamsInterface,
  PaginatedResponseDto,
  PaginationQueryParamsInterface,
} from '../../shared/types';
import { Project } from './project.entity';
import { ProjectEvents, ProjectViewedEvent } from './events';
import { TechnologyName } from '../technologies/types';
import { DeveloperRoleName } from '../developer-roles/types';

interface GetProjectsQueryParams {
  name: string;
  techStack: TechnologyName[];
  roles: DeveloperRoleName[];
}

@Injectable()
export class ProjectsQueryService {
  constructor(
    @OgmaLogger(ProjectsQueryService) private readonly logger: OgmaService,
    private readonly projectsRepository: ProjectRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async getProjectById(id: number) {
    return await this.projectsRepository.getProjectById(id);
  }

  public dispatchProjectViewed(id: number) {
    this.eventEmitter.emit(
      ProjectEvents.ProjectViewed,
      new ProjectViewedEvent(id),
    );
  }
  public async getProjects({
    name,
    techStack,
    roles,
    page,
    pageSize,
    includeDeleted,
  }: GetProjectsQueryParams &
    PaginationQueryParamsInterface &
    IncludeDeletedQueryParamsInterface): Promise<
    PaginatedResponseDto<Project>
  > {
    const offset = page * pageSize;
    const [projects, count] = await this.projectsRepository.findAndCount(
      {
        techStack: { name: { $in: techStack } },
        roles: { name: { $in: roles } },
        name: { $re: name },
      },
      {
        limit: pageSize,
        offset,
        orderBy: {
          hits: 'desc',
          createdAt: 'asc',
        },
        filters: {
          softDelete: { includeDeleted },
        },
      },
    );

    const isFinished = projects.length + offset === count;

    return {
      total: count,
      offset,
      isFinished,
      data: projects,
    };
  }
}
