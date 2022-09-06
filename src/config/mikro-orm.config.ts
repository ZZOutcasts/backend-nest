import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { ConsoleLogger, NotFoundException } from '@nestjs/common';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const logger = new ConsoleLogger('MikroORM');

const config: Options = {
  type: 'postgresql',
  dbName: 'projectly',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  validate: true,
  logger: logger.log.bind(logger),
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
  findOneOrFailHandler: (entityName) => {
    throw new NotFoundException(`${entityName} not found`);
  },
  allowGlobalContext: true,
};
export default config;
