import { createHmac } from "node:crypto";
import { env } from "@/main/config/env";

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  type: "access" | "refresh";
  exp: number;
  iat: number;
};

const ACCESS_TTL_SECONDS = 60 * 15;
const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 7;

const toBase64Url = (value: string) =>
  Buffer.from(value).toString("base64url");

const fromBase64Url = (value: string) =>
  Buffer.from(value, "base64url").toString("utf-8");

const sign = (header: string, payload: string, secret: string) =>
  createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");

const createToken = (
  payload: Omit<JwtPayload, "iat" | "exp">,
  secret: string,
  ttlSeconds: number,
): string => {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = toBase64Url(
    JSON.stringify({
      ...payload,
      iat: now,
      exp: now + ttlSeconds,
    } satisfies JwtPayload),
  );

  return `${header}.${body}.${sign(header, body, secret)}`;
};

const verifyToken = (
  token: string,
  secret: string,
  expectedType: JwtPayload["type"],
): JwtPayload | null => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) return null;

  const expectedSignature = sign(header, payload, secret);

  if (signature !== expectedSignature) return null;

  const decodedPayload = JSON.parse(fromBase64Url(payload)) as JwtPayload;
  const now = Math.floor(Date.now() / 1000);

  if (decodedPayload.type !== expectedType) return null;
  if (decodedPayload.exp <= now) return null;

  return decodedPayload;
};

export const createAccessToken = (user: {
  id: string;
  email: string;
  name: string;
}) =>
  createToken(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      type: "access",
    },
    env.JWT_ACCESS_SECRET,
    ACCESS_TTL_SECONDS,
  );

export const createRefreshToken = (user: {
  id: string;
  email: string;
  name: string;
}) =>
  createToken(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      type: "refresh",
    },
    env.JWT_REFRESH_SECRET,
    REFRESH_TTL_SECONDS,
  );

export const verifyAccessToken = (token: string) =>
  verifyToken(token, env.JWT_ACCESS_SECRET, "access");

export const verifyRefreshToken = (token: string) =>
  verifyToken(token, env.JWT_REFRESH_SECRET, "refresh");
