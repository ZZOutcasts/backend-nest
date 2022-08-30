import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as z from 'zod';
import dbConfig from './db.config';
import envConfig from './env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [dbConfig, envConfig],
      validationSchema: (() => {
        const schema = z.object({
          MIKRO_ORM_USER: z.string().min(1),
          MIKRO_ORM_PASSWORD: z.string().min(1),
          MIKRO_ORM_DB_NAME: z.string().default('projectly'),
          MIKRO_ORM_HOST: z.string().default('database'),
          MIKRO_ORM_PORT: z.preprocess(
            (port: string) => (port ? parseInt(port, 10) : 0),
            z.number().default(5432),
          ),
          PORT: z.preprocess(
            (port: string) => (port ? parseInt(port, 10) : 0),
            z.number().default(8080),
          ),
          NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'),
        });

        return { validate: schema.parse };
      })(),
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
