import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";
import { UpdateUserUseCaseImpl } from "@/application/use-cases/user/UpdateUserUseCaseImpl";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeUpdateUserUseCase = (): UpdateUserUseCaseI => {
    return new UpdateUserUseCaseImpl(userRepository)
};