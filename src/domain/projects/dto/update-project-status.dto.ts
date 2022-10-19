import { createZodDto } from '@anatine/zod-nestjs';
import { ProjectSchema } from '../project.entity';

export class UpdateProjectStatusDto extends createZodDto(
  ProjectSchema.pick({ status: true }),
) {}
