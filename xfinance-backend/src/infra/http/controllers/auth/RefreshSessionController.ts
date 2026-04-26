import { BaseController } from "@/infra/http/controllers/BaseController";
import { badRequest, ok, unauthorized } from "@/infra/http/helpers/http";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "@/main/security/jwt";

type RefreshRequest = {
  refreshToken: string;
};

type RefreshResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export class RefreshSessionController extends BaseController {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async execute(
    httpRequest: HttpRequest<RefreshRequest>,
  ): Promise<HttpResponse<RefreshResponse | { error_code: string; error_description: string }>> {
    const refreshToken = httpRequest.body?.refreshToken;

    if (!refreshToken) {
      return badRequest(new Error("refreshToken is required"));
    }

    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return unauthorized(new Error("invalid refresh token"));
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
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
    });
  }
}
