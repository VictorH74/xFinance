import { BaseController } from "@/infra/http/controllers/BaseController";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";
import { RegisterController } from "@/infra/http/controllers/auth/RegisterController";
import { makeCreateUserUseCase } from "../../use-cases/user/makeCreateUserUseCase";

export const makeRegisterController = (): BaseController => {
  const useCase = makeCreateUserUseCase();
  return new RegisterController(useCase);
};
