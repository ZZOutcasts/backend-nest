import { TimestampedEntity } from './timestamped.entity';
import { Index, Property } from '@mikro-orm/core';

export abstract class SoftDeleteTimestampedEntity extends TimestampedEntity {
  @Index()
  @Property()
  deletedAt?: Date;

  public softDelete() {
    this.deletedAt = new Date();
  }

  public restore() {
    this.deletedAt = null;
  }
}
