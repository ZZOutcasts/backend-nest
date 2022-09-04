import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { DeveloperRolesModule } from './developer-roles/developer-roles.module';
import { TechnologiesApiModule } from './technologiesApi/technologiesApi.module';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    ProjectsModule,
    RecruitmentsModule,
    DeveloperRolesModule,
    TechnologiesApiModule,
    DomainModule,
  ],
})
export class ApiModule {}
