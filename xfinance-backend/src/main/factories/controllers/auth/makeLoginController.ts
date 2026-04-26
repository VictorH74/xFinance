import { BaseController } from "@/infra/http/controllers/BaseController";
import { LoginController } from "@/infra/http/controllers/auth/LoginController";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeLoginController = (): BaseController =>
  new LoginController(userRepository);
