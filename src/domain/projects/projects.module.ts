import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './project.entity';
import { ProjectMember } from './project-member.entity';
import { OgmaModule } from '@ogma/nestjs-module';
import { HydrateCreateProjectDtoPipe } from './pipes/hydrate-create-project-dto.pipe';
import { DeveloperRolesModule } from '../developer-roles/developer-roles.module';
import { TechnologiesModule } from '../technologies/technologies.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Project, ProjectMember]),
    OgmaModule.forFeatures([]),
    DeveloperRolesModule,
    TechnologiesModule,
  ],
  providers: [ProjectsService, HydrateCreateProjectDtoPipe],
  exports: [ProjectsService, HydrateCreateProjectDtoPipe],
})
export class ProjectsModule {}
