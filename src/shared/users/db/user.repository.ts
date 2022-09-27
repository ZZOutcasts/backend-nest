import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
  public async findByEmail(email: string) {
    return await this.findOneOrFail({ email });
  }

  public async findByUsername(username: string) {
    return await this.findOneOrFail({ username });
  }

  public async findBySlug(slug: string) {
    return await this.findOneOrFail({ slug });
  }

  public async findById(id: string) {
    return await this.findOneOrFail({ id });
  }
}
