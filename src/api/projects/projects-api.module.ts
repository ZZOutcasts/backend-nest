import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsRecruitmentsController } from './projects-recruitments.controller';
import { ProjectsMembersController } from './projects-members.controller';
import { ProjectsTechnologiesController } from './projects-technologies.controller';
import { ProjectsDeveloperRolesController } from './projects-developer-roles.controller';
import { ProjectsSprintsController } from './projects-sprints.controller';
import { ProjectsModule } from '@domain/projects/projects.module';
import { DeveloperRolesModule } from '@domain/developer-roles/developer-roles.module';
import { TechnologiesModule } from '@domain/technologies/technologies.module';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [
    ProjectsModule,
    DeveloperRolesModule,
    TechnologiesModule,
    OgmaModule.forFeatures([
      ProjectsController,
      ProjectsRecruitmentsController,
      ProjectsMembersController,
      ProjectsTechnologiesController,
      ProjectsDeveloperRolesController,
      ProjectsSprintsController,
    ]),
  ],
  controllers: [
    ProjectsController,
    ProjectsRecruitmentsController,
    ProjectsMembersController,
    ProjectsTechnologiesController,
    ProjectsDeveloperRolesController,
    ProjectsSprintsController,
  ],
})
export class ProjectsApiModule {}
