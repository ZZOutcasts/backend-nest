import { Module } from '@nestjs/common';
import { DeveloperRolesController } from './developer-roles.controller';

@Module({
  controllers: [DeveloperRolesController],
})
export class DeveloperRolesModule {}
