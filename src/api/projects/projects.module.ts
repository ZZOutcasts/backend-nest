import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsRecruitmentsController } from './projects-recruitments.controller';
import { ProjectsMembersController } from './projects-members.controller';
import { ProjectsTechnologiesController } from './projects-technologies.controller';
import { ProjectsDeveloperRolesController } from './projects-developer-roles.controller';
import { ProjectsSprintsController } from './projects-sprints.controller';

@Module({
  controllers: [
    ProjectsController,
    ProjectsRecruitmentsController,
    ProjectsMembersController,
    ProjectsTechnologiesController,
    ProjectsDeveloperRolesController,
    ProjectsSprintsController,
  ],
})
export class ProjectsModule {}
