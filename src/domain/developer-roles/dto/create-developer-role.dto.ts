import { createZodDto } from '@anatine/zod-nestjs';
import { DeveloperRoleSchema } from '../developer-role.entity';

export class CreateDeveloperRoleDto extends createZodDto(
  DeveloperRoleSchema.omit({ id: true }),
) {}
