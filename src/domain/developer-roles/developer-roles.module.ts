import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DeveloperRoleService } from './developer-role.service';
import { DeveloperRole } from './developer-role.entity';
import { HydrateDeveloperRolesPipe } from './hydrate-developer-roles.pipe';

@Module({
  imports: [
    OgmaModule.forFeatures([DeveloperRoleService]),
    MikroOrmModule.forFeature({
      entities: [DeveloperRole],
    }),
  ],
  providers: [DeveloperRoleService, HydrateDeveloperRolesPipe],
  exports: [DeveloperRoleService, HydrateDeveloperRolesPipe],
})
export class DeveloperRolesModule {}
