import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from '../db';

export class ChangeAuthRoleDto extends createZodDto(
  UserSchema.pick({ authRole: true }),
) {}
