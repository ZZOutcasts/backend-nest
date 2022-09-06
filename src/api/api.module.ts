import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { DeveloperRolesApiModule } from './developer-roles-api/developer-roles-api.module';
import { TechnologiesApiModule } from './technologies-api/technologies-api.module';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    ProjectsModule,
    RecruitmentsModule,
    DeveloperRolesApiModule,
    TechnologiesApiModule,
    DomainModule,
  ],
})
export class ApiModule {}
