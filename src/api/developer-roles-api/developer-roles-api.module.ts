import { Module } from '@nestjs/common';
import { DeveloperRolesApiController } from './developer-roles-api.controller';
import { DeveloperRolesModule } from '@domain/developer-roles/developer-roles.module';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [
    DeveloperRolesModule,
    OgmaModule.forFeatures([DeveloperRolesApiController]),
  ],
  controllers: [DeveloperRolesApiController],
})
export class DeveloperRolesApiModule {}
