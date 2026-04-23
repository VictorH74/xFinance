import { IFinanceMetaRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { RemoveFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/RemoveFinanceMetaUseCase";
import { RemoveUserUseCaseI } from "@/application/interfaces/use-cases/user/RemoveUserUseCase";

export class RemoveFinanceMetaUseCaseImpl implements RemoveFinanceMetaUseCaseI {
  constructor(private readonly repository: IFinanceMetaRepository) {}

  async execute(
    id: RemoveFinanceMetaUseCaseI.Request,
  ): Promise<RemoveFinanceMetaUseCaseI.Response> {
    return this.repository.remove(id);
  }
}
