import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
  atSecret: process.env.JWT_AT_SECRET,
  rtSecret: process.env.JWT_RT_SECRET,
  atExpiration: process.env.JWT_AT_EXPIRATION,
  rtExpiration: process.env.JWT_RT_EXPIRATION,
}));
