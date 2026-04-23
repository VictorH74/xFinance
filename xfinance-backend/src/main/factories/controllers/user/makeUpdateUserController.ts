import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeUpdateUserUseCase } from "../../use-cases/user/makeUpdateUserUseCase";
import { UpdateUserController } from "@/infra/http/controllers/user/UpdateUserController";

export const makeUpdateUserController = (): BaseController => {
  const useCase = makeUpdateUserUseCase();
  return new UpdateUserController(useCase);
};
