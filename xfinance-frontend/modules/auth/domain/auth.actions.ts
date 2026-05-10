"use server";
import {
  ApiLoginResponse,
  ApiRefreshResponse,
  ApiSessionResponse,
  AuthSession,
  AuthTokens,
  AuthUser,
  CookieStoreLike,
  LoginInput,
  RegisterUser,
  RequestOptions,
  SessionResult,
} from "./auth.types";
import { authCookieNames } from "./auth.data";
import { redirect } from "next/navigation";
import { z } from "zod";

const DEFAULT_API_BASE_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

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
    headers.set("authorization", `Bearer ${accessToken}`);
  }

  return headers;
}

// TODO: separate
// ###### Auth api #########################################

function getApiBaseUrl() {
  if (!DEFAULT_API_BASE_URL) {
    throw new Error("Missing auth API base URL. Set NEXT_PUBLIC_API_URL.");
  }

  return DEFAULT_API_BASE_URL.replace(/\/$/, "");
}

// TODO: move to separate file
const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function loginAction(_prev: unknown, formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
    // signal: options.signal,
    cache: "no-store",
  });

  if (!res.ok) {
    return { error: "Email ou senha inválidos" };
  }

  const { accessToken, refreshToken } =
    await parseJsonResponse<ApiLoginResponse>(res);

  // salva o JWT em cookie httpOnly via next/headers
  const { cookies } = await import("next/headers");
  (await cookies()).set(authCookieNames.accessToken, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
  });
  (await cookies()).set(authCookieNames.refreshToken, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}

export async function registerAction(
  input: RegisterUser,
  options: RequestOptions = {},
): Promise<AuthSession> {
  const response = await fetch(`${getApiBaseUrl()}/auth/register`, {
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

export async function fetchSession(
  accessToken: string,
  options: RequestOptions = {},
): Promise<AuthUser | null> {
  console.log("fetchSession >> HEADER: ", createBearerHeaders(accessToken));
  const response = await fetch(`${getApiBaseUrl()}/auth/session`, {
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

export async function refreshSession(
  refreshToken: string,
  options: RequestOptions = {},
): Promise<ApiRefreshResponse | null> {
  const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
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

export async function logoutAction(_prev: unknown, formData: FormData) {
  const { cookies } = await import("next/headers");

  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get(
    authCookieNames.refreshToken,
  )?.value;

  const response = await fetch(`${getApiBaseUrl()}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!response.ok && response.status !== 204) {
    const errorBody = await response.text();
    return {
      error: `Logout failed with status ${response.status}${errorBody ? `: ${errorBody}` : ""}`,
    };
  }

  redirect("/auth/login");
}
// #########################################################

export async function resolveSession(
  tokens: Partial<AuthTokens>,
): Promise<SessionResult | null> {
  if (tokens.accessToken) {
    const user = await fetchSession(tokens.accessToken);

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

  const refreshedSession = await refreshSession(tokens.refreshToken);

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

export async function resolveSessionFromCookies(): Promise<SessionResult | null> {
  const { cookies } = await import("next/headers");

  const cookieStore = cookies();
  const accessToken = (await cookieStore).get(
    authCookieNames.accessToken,
  )?.value;
  const refreshToken = (await cookieStore).get(
    authCookieNames.refreshToken,
  )?.value;

  return resolveSession({ accessToken, refreshToken });
}
