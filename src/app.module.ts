import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppConfigModule } from './config/app-config.module';
import { ProjectsModule } from './projects/projects.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { DeveloperRolesModule } from './developer-roles/developer-roles.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [
    SharedModule,
    AppConfigModule,
    ProjectsModule,
    RecruitmentsModule,
    DeveloperRolesModule,
    TechnologiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
