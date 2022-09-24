import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [OgmaModule.forFeatures([UsersController])],
  providers: [],
  controllers: [UsersController],
})
export class UsersApiModule {}
