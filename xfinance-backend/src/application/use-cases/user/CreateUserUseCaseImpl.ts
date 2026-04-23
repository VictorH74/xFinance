import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";

export class CreateUserUseCaseImpl implements CreateUserUseCaseI {
  constructor(private readonly UserRepository: IUserRepository) {}

  async execute(
    reqBody: CreateUserUseCaseI.Request,
  ): Promise<CreateUserUseCaseI.Response> {
    const user = await this.UserRepository.save(reqBody);

    // TODO: handle duplicated user error

    return user;
  }
}
