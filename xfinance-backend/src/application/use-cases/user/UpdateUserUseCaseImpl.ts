import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";

export class UpdateUserUseCaseImpl implements UpdateUserUseCaseI {
  constructor(private readonly UserRepository: IUserRepository) {}

  async execute(
    reqBody: UpdateUserUseCaseI.Request,
  ): Promise<UpdateUserUseCaseI.Response> {
    const user = await this.UserRepository.update(reqBody);

    return user;
  }
}
