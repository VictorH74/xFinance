import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeCreateUserUseCase } from "../../use-cases/user/makeCreateUserUseCase";
import { CreateUserController } from "@/infra/http/controllers/user/CreateUserController";

export const makeCreateUserController = (): BaseController => {
  const useCase = makeCreateUserUseCase();
  return new CreateUserController(useCase);
};
