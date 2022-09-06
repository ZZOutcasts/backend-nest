import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { OgmaModule } from '@ogma/nestjs-module';
import { Technology } from './technology.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    OgmaModule.forFeatures([TechnologyService]),
    MikroOrmModule.forFeature({
      entities: [Technology],
    }),
  ],
  providers: [TechnologyService],
  exports: [TechnologyService],
})
export class TechnologiesModule {}
