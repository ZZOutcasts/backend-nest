import { Module } from '@nestjs/common';
import { ProjectsApiModule } from './projects/projects-api.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { DeveloperRolesApiModule } from './developer-roles-api/developer-roles-api.module';
import { TechnologiesApiModule } from './technologies-api/technologies-api.module';
import { DomainModule } from '../domain/domain.module';
import { AuthApiModule } from './auth-api/auth-api.module';
import { UsersApiModule } from './users-api/users-api.module';

@Module({
  imports: [
    ProjectsApiModule,
    RecruitmentsModule,
    DeveloperRolesApiModule,
    TechnologiesApiModule,
    DomainModule,
    AuthApiModule,
    UsersApiModule,
  ],
})
export class ApiModule {}
