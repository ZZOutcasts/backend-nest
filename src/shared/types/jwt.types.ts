import { AuthRole } from '../users/types/auth-role.enum';

export interface JwtAtPayload {
  sub: string;
  authRole: AuthRole;
  verified: boolean;
}

export interface JwtRtPayload {
  sub: string;
}

export type AccessToken = string;
export type RefreshToken = string;
export interface TokenPair {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

export interface AccessTokenWithPayload {
  accessToken: AccessToken;
  payload: JwtAtPayload;
}

export interface TokenPairWithPayload extends TokenPair {
  payload: JwtAtPayload;
}
