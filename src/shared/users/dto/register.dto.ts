import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from '../db';

export class RegisterDto extends createZodDto(
  UserSchema.pick({ username: true, email: true, password: true }),
) {}
