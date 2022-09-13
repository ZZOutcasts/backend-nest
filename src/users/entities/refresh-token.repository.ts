import { EntityRepository } from '@mikro-orm/postgresql';
import { RefreshTokenEntity } from './refresh-token.entity';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from '../../shared/types';

interface OverrideRefreshTokenData {
  oldRt: RefreshTokenEntity;
  newRt: RefreshToken;
  validityPeriod: number;
}

export class RefreshTokenRepository extends EntityRepository<RefreshTokenEntity> {
  public async overrideRefreshToken({
    oldRt,
    newRt,
    validityPeriod,
  }: OverrideRefreshTokenData) {
    this.assign(oldRt, {
      value: newRt,
      expiresAt: new Date(Date.now() + validityPeriod),
    });
  }
}
