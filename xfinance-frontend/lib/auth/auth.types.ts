export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSession = {
  user: AuthUser;
  tokens: AuthTokens;
};

export type SessionResult = {
  user: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  didRefresh: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ApiSessionResponse = {
  user: AuthUser;
};

export type ApiLoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type ApiRefreshResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
};

export type CookieStoreLike = {
  get(name: string): { value: string } | undefined;
};

export type RequestOptions = {
  apiBaseUrl?: string;
  signal?: AbortSignal;
};