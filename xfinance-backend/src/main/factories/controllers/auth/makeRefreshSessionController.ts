import { BaseController } from "@/infra/http/controllers/BaseController";
import { RefreshSessionController } from "@/infra/http/controllers/auth/RefreshSessionController";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeRefreshSessionController = (): BaseController =>
  new RefreshSessionController(userRepository);
