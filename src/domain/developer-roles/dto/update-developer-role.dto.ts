import { createZodDto } from '@anatine/zod-nestjs';
import { DeveloperRoleSchema } from '../developer-role.entity';

export class UpdateDeveloperRoleDto extends createZodDto(
  DeveloperRoleSchema.omit({ id: true }).deepPartial(),
) {}
