import { DeveloperRole } from './developer-role.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { DeveloperRoleId, DeveloperRoleName } from './types';

export class DeveloperRoleRepository extends EntityRepository<DeveloperRole> {
  public async findById(id: DeveloperRoleId): Promise<DeveloperRole> {
    return this.findOneOrFail({ id });
  }

  public async findByName(name: DeveloperRoleName): Promise<DeveloperRole> {
    return this.findOneOrFail({ name });
  }

  public searchByName(name: string): Promise<DeveloperRole[]> {
    return this.find({ name: { $re: name } });
  }
}
