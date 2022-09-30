import { createZodDto } from '@anatine/zod-nestjs';
import { ProjectSchema } from '../project.entity';
import { TechnologyId, TechnologyName } from '../../technologies/types';
import {
  DeveloperRoleId,
  DeveloperRoleName,
} from '../../developer-roles/types';
import { Technology } from '../../technologies/technology.entity';
import { DeveloperRole } from '../../developer-roles/developer-role.entity';

export type TechnologyRaw = TechnologyId | TechnologyName;
export type DeveloperRoleRaw = DeveloperRoleId | DeveloperRoleName;

class CreateProjectBase extends createZodDto(
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
