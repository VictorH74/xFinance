import { BaseController } from "@/infra/http/controllers/BaseController";
import { badRequest, ok, unauthorized } from "@/infra/http/helpers/http";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { verifyPassword } from "@/main/security/password";
import { createAccessToken, createRefreshToken } from "@/main/security/jwt";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export class LoginController extends BaseController {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async execute(
    httpRequest: HttpRequest<LoginRequest>,
  ): Promise<HttpResponse<LoginResponse | { error_code: string; error_description: string }>> {
    const body = httpRequest.body;

    if (!body?.email || !body?.password) {
      return badRequest(new Error("email and password are required"));
    }

    const user = await this.userRepository.findByEmail(body.email);

    if (!user || !verifyPassword(body.password, user.password)) {
      return unauthorized(new Error("invalid credentials"));
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
