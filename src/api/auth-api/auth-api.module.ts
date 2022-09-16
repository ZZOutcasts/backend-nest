import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [OgmaModule.forFeatures([AuthController])],
  controllers: [AuthController],
})
export class AuthApiModule {}
