import { BaseController } from "@/infra/http/controllers/BaseController";
import { ok, unauthorized } from "@/infra/http/helpers/http";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { verifyAccessToken } from "@/main/security/jwt";

type SessionResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export class GetSessionController extends BaseController {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async execute(
    httpRequest: HttpRequest,
  ): Promise<HttpResponse<SessionResponse | { error_code: string; error_description: string }>> {
    const authorization = httpRequest.headers?.authorization;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : undefined;

    if (!token) {
      return unauthorized(new Error("missing access token"));
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
      return unauthorized(new Error("invalid access token"));
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      return unauthorized(new Error("user not found"));
    }

    return ok({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}
