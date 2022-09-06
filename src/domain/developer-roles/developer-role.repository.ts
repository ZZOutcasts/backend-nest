import { DeveloperRole } from './developer-role.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

export class DeveloperRoleRepository extends EntityRepository<DeveloperRole> {
  public async findById(id: number): Promise<DeveloperRole> {
    return this.findOneOrFail({ id });
  }

  public async findByName(name: string): Promise<DeveloperRole> {
    return this.findOneOrFail({ name });
  }

  public searchByName(name: string): Promise<DeveloperRole[]> {
    return this.find({ name: { $re: name } });
  }
}
