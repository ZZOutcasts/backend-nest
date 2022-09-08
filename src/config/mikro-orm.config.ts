import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Ogma } from '@ogma/logger';

const logger = new Ogma({
  context: 'MikroORM',
  logLevel: 'ALL',
});

const config: Options = {
  type: 'postgresql',
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
