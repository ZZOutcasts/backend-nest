import { TechnologySchema } from '../technology.entity';
import { createZodDto } from 'nestjs-zod';
import { OmitType } from '@nestjs/mapped-types';

export class CreateTechnologyDto extends OmitType(
  createZodDto(TechnologySchema),
  ['id'],
) {}
