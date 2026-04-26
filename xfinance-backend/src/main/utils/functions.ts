import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { verifyAccessToken } from "@/main/security/jwt";

export const includeUserId = <T extends object>(httpRequest: HttpRequest<T>) => {
  const reqBody = (httpRequest.body ?? {}) as T & { userId?: string };

  const authorization = httpRequest.headers?.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;

  if (token) {
    const payload = verifyAccessToken(token);
    reqBody.userId = payload?.sub;
  }

  return reqBody;
};
