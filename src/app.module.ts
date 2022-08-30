import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppConfigModule } from './config/app-config.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config';
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppExceptionsFilter } from './shared/filters';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    SharedModule,
    AppConfigModule,
    ApiModule,
    DatabaseModule,
    OgmaModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        service: {
          logLevel: 'ALL',
          json: config.get(EnvConfig.IsProd),
        },
        interceptor: {
          http: ExpressParser,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
