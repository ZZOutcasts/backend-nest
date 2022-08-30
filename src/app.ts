import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OgmaService } from '@ogma/nestjs-module';

export async function createApplication(): Promise<
  [INestApplication, ConfigService, OgmaService]
> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<OgmaService>(OgmaService);
  const swaggerConfig = new DocumentBuilder().setTitle('Projectly API').build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: config.get(EnvConfig.IsDev),
      whitelist: true,
      transform: true,
    }),
  );

  app.useLogger(logger);

  app.enableShutdownHooks();

  return [app, config, logger];
}
