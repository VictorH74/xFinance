export type MockUser = {
  id: string;
  name: string;
  email: string;
};

type TokenType = "access" | "refresh";

type TokenPayload = {
  sub: string;
  type: TokenType;
  exp: number;
};

type SessionResult = {
  user: MockUser;
  refreshedAccessToken?: string;
};

const ACCESS_TOKEN_TTL_SECONDS = 60 * 15;
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

const mockUsers: Record<string, MockUser> = {
  "user-1": {
    id: "user-1",
    name: "Victor Demo",
    email: "victor.demo@xfinance.app",
  },
};

function decodePayload(token: string): TokenPayload | null {
  const [prefix, type, sub, exp] = token.split(".");

  if (prefix !== "mock" || !type || !sub || !exp) {
    return null;
  }

  if (type !== "access" && type !== "refresh") {
    return null;
  }

  const expiration = Number(exp);

  if (Number.isNaN(expiration)) {
    return null;
  }

  return {
    sub,
    type,
    exp: expiration,
  };
}

function createMockJwt(userId: string, type: TokenType, expiresInSeconds: number) {
  const payload: TokenPayload = {
    sub: userId,
    type,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  return `mock.${payload.type}.${payload.sub}.${payload.exp}`;
}

function isExpired(expiration: number) {
  return expiration <= Math.floor(Date.now() / 1000);
}

async function mockBackendDelay() {
  await Promise.resolve();
}

export async function validateAccessToken(accessToken?: string) {
  await mockBackendDelay();

  if (!accessToken) {
    return null;
  }

  const payload = decodePayload(accessToken);

  if (!payload || payload.type !== "access" || isExpired(payload.exp)) {
    return null;
  }

  return mockUsers[payload.sub] ?? null;
}

export async function refreshAccessToken(refreshToken?: string) {
  await mockBackendDelay();

  if (!refreshToken) {
    return null;
  }

  const payload = decodePayload(refreshToken);

  if (!payload || payload.type !== "refresh" || isExpired(payload.exp)) {
    return null;
  }

  const user = mockUsers[payload.sub];

  if (!user) {
    return null;
  }

  return {
    user,
    accessToken: createMockJwt(user.id, "access", ACCESS_TOKEN_TTL_SECONDS),
  };
}

export async function resolveMockSession(tokens: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<SessionResult | null> {
  const userFromAccessToken = await validateAccessToken(tokens.accessToken);

  if (userFromAccessToken) {
    return { user: userFromAccessToken };
  }

  const refreshedSession = await refreshAccessToken(tokens.refreshToken);

  if (!refreshedSession) {
    return null;
  }

  return {
    user: refreshedSession.user,
    refreshedAccessToken: refreshedSession.accessToken,
  };
}

export function createMockSession(userId = "user-1") {
  const user = mockUsers[userId];

  if (!user) {
    return null;
  }

  return {
    user,
    accessToken: createMockJwt(userId, "access", ACCESS_TOKEN_TTL_SECONDS),
    refreshToken: createMockJwt(userId, "refresh", REFRESH_TOKEN_TTL_SECONDS),
  };
}

export const authCookieNames = {
  accessToken: "xfinance.access_token",
  refreshToken: "xfinance.refresh_token",
};
