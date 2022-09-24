import { EntityRepository } from '@mikro-orm/postgresql';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshToken } from '../../types';

export interface OverrideRefreshTokenData {
  oldRt: RefreshTokenEntity;
  newRt: RefreshToken;
  validityPeriod: number;
}

export class RefreshTokenRepository extends EntityRepository<RefreshTokenEntity> {
  public async updateRefreshToken({
    oldRt,
    newRt,
    validityPeriod,
  }: OverrideRefreshTokenData): Promise<RefreshTokenEntity> {
    this.assign(oldRt, {
      value: newRt,
      expiresAt: new Date(Date.now() + validityPeriod),
    });
    await this.persistAndFlush(oldRt);
    return oldRt;
  }

  public async findByValue(value: RefreshToken): Promise<RefreshTokenEntity> {
    return this.findOneOrFail({ value });
  }
}
