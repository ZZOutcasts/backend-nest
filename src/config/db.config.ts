import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => ({
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  dbHost: process.env.MIKRO_ORM_HOST,
  dbName: process.env.MIKRO_ORM_NAME,
  dbPort: parseInt(process.env.MIKRO_ORM_PORT, 10) || 5432,
}));
