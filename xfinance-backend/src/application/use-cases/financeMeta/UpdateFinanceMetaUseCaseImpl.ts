import { IFinanceMetaRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { UpdateFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/UpdateFinanceMetaUseCase";
import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";

export class UpdateFinanceMetaUseCaseImpl implements UpdateFinanceMetaUseCaseI {
  constructor(private readonly repository: IFinanceMetaRepository) {}

  async execute(
    reqBody: UpdateFinanceMetaUseCaseI.Request,
  ): Promise<UpdateFinanceMetaUseCaseI.Response> {
    const obj = await this.repository.update(reqBody);

    return obj;
  }
}
