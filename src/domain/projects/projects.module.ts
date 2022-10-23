import { Module } from '@nestjs/common';
import { ProjectsManagementService } from './projects-management.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './project.entity';
import { ProjectMember } from './project-member.entity';
import { OgmaModule } from '@ogma/nestjs-module';
import { DeveloperRolesModule } from '../developer-roles/developer-roles.module';
import { TechnologiesModule } from '../technologies/technologies.module';
import { ProjectEventsListener } from './project-events.listener';
import { ProjectsQueryService } from './projects-query.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Project, ProjectMember]),
    OgmaModule.forFeatures([
      ProjectsQueryService,
      ProjectsManagementService,
      ProjectEventsListener,
    ]),
    DeveloperRolesModule,
    TechnologiesModule,
  ],
  providers: [
    ProjectsManagementService,
    ProjectEventsListener,
    ProjectsQueryService,
  ],
  exports: [ProjectsManagementService, ProjectsQueryService],
})
export class ProjectsModule {}
