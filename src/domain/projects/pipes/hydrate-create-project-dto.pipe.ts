import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DeveloperRoleService } from '../../developer-roles/developer-role.service';
import { TechnologyService } from '../../technologies/technology.service';
import { CreateProjectDto } from '../dto';
import { TechnologyId, TechnologyName } from '../../technologies/types';
import {
  DeveloperRoleId,
  DeveloperRoleName,
} from '../../developer-roles/types';

@Injectable()
export class HydrateCreateProjectDtoPipe implements PipeTransform {
  constructor(
    private readonly developerRolesService: DeveloperRoleService,
    private readonly technologiesService: TechnologyService,
  ) {}
  async transform(data: CreateProjectDto, metadata: ArgumentMetadata) {
    const { techStack, roles } = data;

    const techIds = techStack.filter((entry) =>
      Number.isInteger(entry),
    ) as unknown as TechnologyId[];
    const techNames = techStack.filter(
      (entry) => typeof entry === 'string',
    ) as unknown as TechnologyName[];

    const rolesIds = roles.filter((entry) =>
      Number.isInteger(entry),
    ) as unknown as DeveloperRoleId[];
    const rolesNames = roles.filter(
      (entry) => typeof entry === 'string',
    ) as unknown as DeveloperRoleName[];

    const techsMappedByIdPromise =
      this.technologiesService.getTechnologiesByIds(techIds);
    const techsMappedByNamesPromise =
      this.technologiesService.getTechnologiesByNames(techNames);
    const rolesMappedByIdPromise =
      this.developerRolesService.getDeveloperRolesByIds(rolesIds);
    const rolesMappedByNamesPromise =
      this.developerRolesService.getDeveloperRolesByNames(rolesNames);

    const [
      techsMappedById,
      techsMappedByNames,
      rolesMappedById,
      rolesMappedByNames,
    ] = await Promise.all([
      techsMappedByIdPromise,
      techsMappedByNamesPromise,
      rolesMappedByIdPromise,
      rolesMappedByNamesPromise,
    ]);

    const techsWithNoDupliactes = Array.from(
      new Set([...techsMappedById, ...techsMappedByNames]),
    );
    const rolesWithNoDuplicates = Array.from(
      new Set([...rolesMappedById, ...rolesMappedByNames]),
    );

    return {
      ...data,
      techStack: techsWithNoDupliactes,
      roles: rolesWithNoDuplicates,
    };
  }
}
