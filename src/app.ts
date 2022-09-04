import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OgmaService } from '@ogma/nestjs-module';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

export async function createApplication(): Promise<
  [INestApplication, ConfigService, OgmaService]
> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<OgmaService>(OgmaService);

  const swaggerConfig = new DocumentBuilder().setTitle('Projectly API').build();
  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document);

  app.useLogger(logger);

  app.enableShutdownHooks();

  return [app, config, logger];
}
