import { Module } from '@nestjs/common';
import { DeveloperRolesApiController } from './developer-roles-api.controller';
import { DeveloperRolesModule } from '../../domain/developer-roles/developer-roles.module';

@Module({
  imports: [DeveloperRolesModule],
  controllers: [DeveloperRolesApiController],
})
export class DeveloperRolesApiModule {}
