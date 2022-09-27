import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as z from 'zod';
import ms from 'ms';
import dbConfig from './db.config';
import envConfig from './env.config';
import jwtConfig from './jwt.config';

const checkIfStingIsmsFormat = (string) => {
  try {
    ms(string);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [dbConfig, envConfig, jwtConfig],
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
          JWT_AT_SECRET: z.string().min(24),
          JWT_RT_SECRET: z.string().min(24),
          JWT_AT_EXPIRATION: z
            .string()
            .refine(
              checkIfStingIsmsFormat,
              'JWT_AT_EXPIRATION is not a valid ms string',
            ),
          JWT_RT_EXPIRATION: z
            .string()
            .refine(
              checkIfStingIsmsFormat,
              'JWT_RT_EXPIRATION is not a valid ms string',
            ),
        });

        return { validate: schema.parse };
      })(),
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
