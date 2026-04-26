import "server-only";
import { ApiLoginResponse, ApiRefreshResponse, ApiSessionResponse, AuthSession, AuthTokens, AuthUser, CookieStoreLike, LoginInput, RequestOptions, SessionResult } from "./auth.types";

const DEFAULT_API_BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

export const authCookieNames = {
  accessToken: "xfinance.access_token",
  refreshToken: "xfinance.refresh_token",
} as const;

export const authCookieMaxAge = {
  accessToken: 60 * 15,
  refreshToken: 60 * 60 * 24 * 7,
} as const;

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Auth request failed with status ${response.status}${errorBody ? `: ${errorBody}` : ""}`,
    );
  }

  return (await response.json()) as T;
}

function createBearerHeaders(accessToken?: string) {
  const headers = new Headers();

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
}

export function readAuthTokensFromCookies(cookieStore: CookieStoreLike): Partial<AuthTokens> {
  return {
    accessToken: cookieStore.get(authCookieNames.accessToken)?.value,
    refreshToken: cookieStore.get(authCookieNames.refreshToken)?.value,
  };
}

// TODO: separate
// ###### Auth api #########################################

function getApiBaseUrl(apiBaseUrl?: string) {
  const resolvedBaseUrl = apiBaseUrl ?? DEFAULT_API_BASE_URL;

  if (!resolvedBaseUrl) {
    throw new Error(
      "Missing auth API base URL. Set NEXT_PUBLIC_API_URL.",
    );
  }

  return resolvedBaseUrl.replace(/\/$/, "");
}

export async function loginWithApi(
  input: LoginInput,
  options: RequestOptions = {},
): Promise<AuthSession> {
  const response = await fetch(`${getApiBaseUrl(options.apiBaseUrl)}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    signal: options.signal,
    cache: "no-store",
  });

  const data = await parseJsonResponse<ApiLoginResponse>(response);

  return {
    user: data.user,
    tokens: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  };
}

export async function fetchSessionWithApi(
  accessToken: string,
  options: RequestOptions = {},
): Promise<AuthUser | null> {
  const response = await fetch(`${getApiBaseUrl(options.apiBaseUrl)}/auth/session`, {
    method: "GET",
    headers: createBearerHeaders(accessToken),
    signal: options.signal,
    cache: "no-store",
  });

  if (response.status === 401) {
    return null;
  }

  const data = await parseJsonResponse<ApiSessionResponse>(response);
  return data.user;
}

export async function refreshSessionWithApi(
  refreshToken: string,
  options: RequestOptions = {},
): Promise<ApiRefreshResponse | null> {
  const response = await fetch(`${getApiBaseUrl(options.apiBaseUrl)}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
    signal: options.signal,
    cache: "no-store",
  });

  if (response.status === 401) {
    return null;
  }

  return parseJsonResponse<ApiRefreshResponse>(response);
}

export async function logoutWithApi(
  refreshToken: string,
  options: RequestOptions = {},
): Promise<void> {
  const response = await fetch(`${getApiBaseUrl(options.apiBaseUrl)}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
    signal: options.signal,
    cache: "no-store",
  });

  if (!response.ok && response.status !== 204) {
    const errorBody = await response.text();
    throw new Error(
      `Logout failed with status ${response.status}${errorBody ? `: ${errorBody}` : ""}`,
    );
  }
}
// #########################################################

export async function resolveSession(
  tokens: Partial<AuthTokens>,
  options: RequestOptions = {},
): Promise<SessionResult | null> {
  if (tokens.accessToken) {
    const user = await fetchSessionWithApi(tokens.accessToken, options);

    if (user) {
      return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        didRefresh: false,
      };
    }
  }

  if (!tokens.refreshToken) {
    return null;
  }

  const refreshedSession = await refreshSessionWithApi(tokens.refreshToken, options);

  if (!refreshedSession) {
    return null;
  }

  return {
    user: refreshedSession.user,
    accessToken: refreshedSession.accessToken,
    refreshToken: refreshedSession.refreshToken ?? tokens.refreshToken,
    didRefresh: true,
  };
}

export async function resolveSessionFromCookies(
  cookieStore: CookieStoreLike,
  options: RequestOptions = {},
): Promise<SessionResult | null> {
  return resolveSession(readAuthTokensFromCookies(cookieStore), options);
}
