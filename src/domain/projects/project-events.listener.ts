import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProjectEvents, ProjectViewedEvent } from './events';
import { ProjectRepository } from './project.repository';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@Injectable()
export class ProjectEventsListener {
  constructor(
    private readonly projectsRepository: ProjectRepository,
    @OgmaLogger(ProjectEventsListener)
    private readonly logger: OgmaService,
  ) {}

  @OnEvent(ProjectEvents.ProjectViewed, { async: true })
  public async handleProjectViewedEvent({ projectId }: ProjectViewedEvent) {
    this.logger.debug(`Got ProjectViewedEvent, projectId: ${projectId}`);
    const project = await this.projectsRepository.getProjectById(projectId);
    project.hits += 1;
    await this.projectsRepository.persistAndFlush(project);
  }
}
