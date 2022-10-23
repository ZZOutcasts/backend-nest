import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DeveloperRoleService } from './developer-role.service';
import { DeveloperRoleId, DeveloperRoleName, DeveloperRoleRaw } from './types';

interface IDeveloperRoles {
  roles: DeveloperRoleRaw[];
}

@Injectable()
export class HydrateDeveloperRolesPipe implements PipeTransform {
  constructor(private readonly developerRolesService: DeveloperRoleService) {}
  async transform(data: IDeveloperRoles, metadata: ArgumentMetadata) {
    const rolesIds = data.roles.filter((entry) =>
      Number.isInteger(entry),
    ) as DeveloperRoleId[];
    const rolesNames = data.roles.filter(
      (entry) => typeof entry === 'string',
    ) as DeveloperRoleName[];

    const rolesByIdsPromise =
      this.developerRolesService.getDeveloperRolesByIds(rolesIds);
    const rolesByNamesPromise =
      this.developerRolesService.getDeveloperRolesByNames(rolesNames);

    const mappedRoles = await Promise.all([
      rolesByIdsPromise,
      rolesByNamesPromise,
    ]);

    const rolesNoDuplicates = Array.from(new Set([...mappedRoles]));

    return {
      ...data,
      roles: rolesNoDuplicates,
    };
  }
}
