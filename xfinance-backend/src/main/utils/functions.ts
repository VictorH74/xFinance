import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { verifyAccessToken } from "@/main/security/jwt";

export const includeUserId = <T extends object>(httpRequest: HttpRequest<T>, propName: keyof HttpRequest = "body") => {
  const reqData = (httpRequest[propName] ?? {}) as T & { userId?: string };

  const authorization = httpRequest.headers?.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;

  if (token) {
    const payload = verifyAccessToken(token);
    reqData.userId = payload?.sub;
  }

  return reqData;
};
