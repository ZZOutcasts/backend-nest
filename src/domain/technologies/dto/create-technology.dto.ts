import { TechnologySchema } from '../technology.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateTechnologyDto extends createZodDto(
  TechnologySchema.omit({ id: true }),
) {}
