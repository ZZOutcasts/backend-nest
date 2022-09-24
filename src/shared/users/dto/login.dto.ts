export interface LoginDto {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginWithUsernameDto {
  username: string;
  password: string;
}

export interface LoginWithEmailDto {
  email: string;
  password: string;
}
