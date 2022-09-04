import { EntityRepository } from '@mikro-orm/postgresql';
import { Technology } from './technology.entity';

export class TechnologyRepository extends EntityRepository<Technology> {
  public async findById(id: number): Promise<Technology> {
    return this.findOneOrFail({ id });
  }

  public async findByName(name: string): Promise<Technology> {
    return this.findOneOrFail({ name });
  }

  /**
   * @description perform a text search on technologies
   */
  public searchByName(name: string): Promise<Technology[]> {
    return this.find({ name: { $re: name } });
  }
}
