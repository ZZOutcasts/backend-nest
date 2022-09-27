import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from '../db';

export class UpdateUserDto extends createZodDto(
  UserSchema.omit({
    id: true,
    password: true,
    slug: true,
    updatedAt: true,
    authRole: true,
    lastLoggedInAt: true,
    createdAt: true,
  }).partial(),
) {}
