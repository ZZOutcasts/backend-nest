import { Injectable } from '@nestjs/common';
import {
  OverrideRefreshTokenData,
  RefreshTokenRepository,
} from './refresh-token.repository';
import { RefreshToken } from '../types';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly rtRepository: RefreshTokenRepository) {}

  public async overrideRefreshToken(data: OverrideRefreshTokenData) {
    return this.rtRepository.overrideRefreshToken(data);
  }

  public async getTokenByValue(value: RefreshToken) {
    return this.rtRepository.findOneOrFail({ value });
  }
}
