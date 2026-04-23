import { RemoveUserUseCaseI } from "@/application/interfaces/use-cases/user/RemoveUserUseCase";
import { RemoveUserUseCaseImpl } from "@/application/use-cases/user/RemoveUserUseCaseImpl";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeRemoveUserUseCase = (): RemoveUserUseCaseI => {
    return new RemoveUserUseCaseImpl(userRepository)
};