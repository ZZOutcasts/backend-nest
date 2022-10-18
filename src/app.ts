import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OgmaService } from '@ogma/nestjs-module';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import cookieParser from 'cookie-parser';

const corsConfig = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  methods: 'GET,PUT,PATCH,POST,DELETE',
}

export async function createApplication(): Promise<
  [INestApplication, ConfigService, OgmaService]
> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, cors:corsConfig });
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<OgmaService>(OgmaService);

  const swaggerConfig = new DocumentBuilder().setTitle('Projectly API').build();
  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser());
  app.useLogger(logger);

  app.enableShutdownHooks();

  return [app, config, logger];
}
