import { BaseController } from "@/infra/http/controllers/BaseController";
import {
  badRequest,
  conflict,
  ok,
  unauthorized,
} from "@/infra/http/helpers/http";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { createAccessToken, createRefreshToken } from "@/main/security/jwt";
import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";

export class RegisterController extends BaseController {
  constructor(private readonly useCase: CreateUserUseCaseI) {
    super();
  }

  async execute(
    httpRequest: RegisterController.Request,
  ): Promise<RegisterController.Response> {
    const body = httpRequest.body;

    const user = await this.useCase.execute(body!);

    if (user instanceof InvalidDataError) {
      return badRequest(user);
    }

    if (user instanceof DuplicatedUserError) {
      return conflict(user);
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

export namespace RegisterController {
  export type Request = HttpRequest<CreateUserUseCaseI.Request>;
  export type Response = HttpResponse<
    | {
        user: {
          id: string;
          name: string;
          email: string;
        };
        accessToken: string;
        refreshToken: string;
      }
    | { error_code: string; error_description: string }
  >;
}
