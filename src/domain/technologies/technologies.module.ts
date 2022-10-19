import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { OgmaModule } from '@ogma/nestjs-module';
import { Technology } from './technology.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HydrateTechnologiesPipe } from './hydrate-technologies.pipe';

@Module({
  imports: [
    OgmaModule.forFeatures([TechnologyService]),
    MikroOrmModule.forFeature({
      entities: [Technology],
    }),
  ],
  providers: [TechnologyService, HydrateTechnologiesPipe],
  exports: [TechnologyService, HydrateTechnologiesPipe],
})
export class TechnologiesModule {}
