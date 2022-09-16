import { AuthRole } from '../users/auth-role.enum';

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
