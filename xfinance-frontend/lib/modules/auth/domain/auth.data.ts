export const authCookieNames = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
} as const;

export const authCookieMaxAge = {
  accessToken: 60 * 15,
  refreshToken: 60 * 60 * 24 * 7,
} as const;