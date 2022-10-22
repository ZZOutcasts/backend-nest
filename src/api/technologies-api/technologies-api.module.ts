import { Module } from '@nestjs/common';
import { TechnologiesApiController } from './technologies-api.controller';
import { TechnologiesModule } from '@domain/technologies/technologies.module';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [
    TechnologiesModule,
    OgmaModule.forFeatures([TechnologiesApiController]),
  ],
  controllers: [TechnologiesApiController],
})
export class TechnologiesApiModule {}
