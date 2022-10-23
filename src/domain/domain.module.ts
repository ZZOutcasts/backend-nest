import { Module } from '@nestjs/common';
import { TechnologiesModule } from './technologies/technologies.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TechnologiesModule, ProjectsModule],
})
export class DomainModule {}
