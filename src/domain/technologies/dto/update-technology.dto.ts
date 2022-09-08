import { createZodDto } from '@anatine/zod-nestjs';
import { TechnologySchema } from '../technology.entity';

export class UpdateTechnologyDto extends createZodDto(
  TechnologySchema.omit({ id: true }).deepPartial(),
) {}
