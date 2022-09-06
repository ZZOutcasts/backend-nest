import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DeveloperRoleService } from './developer-role.service';
import { DeveloperRole } from './developer-role.entity';

@Module({
  imports: [
    OgmaModule.forFeatures([DeveloperRoleService]),
    MikroOrmModule.forFeature({
      entities: [DeveloperRole],
    }),
  ],
  providers: [DeveloperRoleService],
  exports: [DeveloperRoleService],
})
export class DeveloperRolesModule {}
