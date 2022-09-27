import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from '../db';

export class ChangePasswordDto extends createZodDto(
  UserSchema.pick({ password: true }),
) {}
