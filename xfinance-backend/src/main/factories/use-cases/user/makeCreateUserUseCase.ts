import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";
import { CreateUserUseCaseImpl } from "@/application/use-cases/user/CreateUserUseCaseImpl";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeCreateUserUseCase = (): CreateUserUseCaseI => {
    return new CreateUserUseCaseImpl(userRepository)
};