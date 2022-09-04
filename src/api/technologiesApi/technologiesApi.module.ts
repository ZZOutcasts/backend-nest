import { Module } from '@nestjs/common';
import { TechnologiesApiController } from './technologiesApi.controller';
import {TechnologiesModule} from "../../domain/technologies/technologies.module";

@Module({
  imports:[TechnologiesModule],
  controllers: [TechnologiesApiController],
})
export class TechnologiesApiModule {}
