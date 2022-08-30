import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppConfigModule } from './config/app-config.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [SharedModule, AppConfigModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
