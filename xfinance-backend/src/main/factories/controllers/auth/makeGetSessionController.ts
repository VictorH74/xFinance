import { BaseController } from "@/infra/http/controllers/BaseController";
import { GetSessionController } from "@/infra/http/controllers/auth/GetSessionController";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeGetSessionController = (): BaseController =>
  new GetSessionController(userRepository);
