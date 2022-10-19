import { createZodDto } from '@anatine/zod-nestjs';
import { ProjectSchema } from '../project.entity';

export class UpdateProjectCapacityDto extends createZodDto(
  ProjectSchema.pick({ capacity: true }),
) {}
