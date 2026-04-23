import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { RemoveUserUseCaseI } from "@/application/interfaces/use-cases/user/RemoveUserUseCase";

export class RemoveUserUseCaseImpl implements RemoveUserUseCaseI {
  constructor(private readonly UserRepository: IUserRepository) {}

  async execute(
    id: RemoveUserUseCaseI.Request,
  ): Promise<RemoveUserUseCaseI.Response> {
    await this.UserRepository.remove(id);
  }
}
