import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeRemoveUserUseCase } from "../../use-cases/user/makeRemoveUserUseCase";
import { RemoveUserController } from "@/infra/http/controllers/user/RemoveUserController";

export const makeRemoveUserController = (): BaseController => {
  const useCase = makeRemoveUserUseCase();
  return new RemoveUserController(useCase);
};
