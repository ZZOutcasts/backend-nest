import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { DeveloperRolesModule } from './developer-roles/developer-roles.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    ProjectsModule,
    RecruitmentsModule,
    DeveloperRolesModule,
    TechnologiesModule,
    DomainModule,
  ],
})
export class ApiModule {}
