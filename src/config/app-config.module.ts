import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './db.config';
import envConfig from './env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [dbConfig, envConfig],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
