import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  conflict,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { CreateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/CreateTransactionUseCase";
import { UpdateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/UpdateTransactionUseCase";

export class UpdateTransactionController extends BaseController {
  constructor(private readonly useCase: UpdateTransactionUseCaseI) {
    super();
  }

  async execute(
    httpRequest: UpdateTransactionController.Request,
  ): Promise<UpdateTransactionController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace UpdateTransactionController {
  export type Request = HttpRequest<UpdateTransactionUseCaseI.Request>;
  export type Response = HttpResponse<UpdateTransactionUseCaseI.Response>;
}
