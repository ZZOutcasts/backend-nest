import { createZodDto } from '@anatine/zod-nestjs';
import { ProjectSchema } from '../project.entity';
import { TechnologyRaw } from '@domain/technologies/types';
import { DeveloperRoleRaw } from '@domain/developer-roles/types';
import { Technology } from '@domain/technologies/technology.entity';
import { DeveloperRole } from '@domain/developer-roles/developer-role.entity';

export class CreateProjectBase extends createZodDto(
  ProjectSchema.pick({
    name: true,
    description: true,
    capacity: true,
  }),
) {}

export class CreateProjectHydratedDto extends CreateProjectBase {
  techStack: Technology[];
  roles: DeveloperRole[];
}

export class CreateProjectDto extends CreateProjectBase {
  techStack: TechnologyRaw[];
  roles: DeveloperRoleRaw[];
}
