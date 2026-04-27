import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { api } from "./api-client";

type AuthTokens = {
  accessToken?: string;
  refreshToken?: string;
};

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let tokens: AuthTokens = {};
let refreshRequest: Promise<string | null> | null = null;
let isConfigured = false;

function getApiBaseUrl() {
  const baseURL = api.defaults.baseURL ?? process.env.NEXT_PUBLIC_API_URL;

  if (!baseURL) {
    throw new Error("Missing API base URL. Set NEXT_PUBLIC_API_URL.");
  }

  return baseURL.replace(/\/$/, "");
}

async function refreshAccessToken(): Promise<string | null> {
  if (!tokens.refreshToken) {
    return null;
  }

  if (!refreshRequest) {
    refreshRequest = axios
      .post<{ accessToken: string; refreshToken?: string }>(
        `${getApiBaseUrl()}/auth/refresh`,
        { refreshToken: tokens.refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(({ data }) => {
        setAuthTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken ?? tokens.refreshToken,
        });

        return data.accessToken;
      })
      .catch(() => {
        clearAuthTokens();
        return null;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

export function setAuthTokens(nextTokens: AuthTokens) {
  tokens = {
    ...tokens,
    ...nextTokens,
  };
}

export function clearAuthTokens() {
  tokens = {};
}

export function getAuthTokens() {
  return { ...tokens };
}

export function setupAuthInterceptor() {
  if (isConfigured) {
    return api;
  }

  api.interceptors.request.use((config) => {
    const nextConfig = config;

    if (tokens.accessToken) {
      nextConfig.headers.set("authorization", `Bearer ${tokens.accessToken}`);
    }

    return nextConfig;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry
      ) {
        throw error;
      }

      originalRequest._retry = true;

      const accessToken = await refreshAccessToken();

      if (!accessToken) {
        throw error;
      }

      originalRequest.headers.set("authorization", `Bearer ${accessToken}`);

      return api(originalRequest);
    },
  );

  isConfigured = true;
  return api;
}

setupAuthInterceptor();
