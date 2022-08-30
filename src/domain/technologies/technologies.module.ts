import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [OgmaModule.forFeatures([TechnologyService])],
  providers: [TechnologyService],
  exports: [TechnologyService],
})
export class TechnologiesModule {}
