import { IFinanceMetaRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { CreateFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/CreateFinanceMetaUseCase";

export class CreateFinanceMetaUseCaseImpl implements CreateFinanceMetaUseCaseI {
  constructor(private readonly repository: IFinanceMetaRepository) {}

  async execute(
    reqBody: CreateFinanceMetaUseCaseI.Request,
  ): Promise<CreateFinanceMetaUseCaseI.Response> {
    try {
      const obj = await this.repository.save(reqBody);

      return obj;
    } catch (error) {
      if (
        error instanceof Error &&
        ("code" in error
          ? error.code === "P2002"
          : error.name === "USER_DUPLICATE" ||
            error.message.toLowerCase().includes("duplicate"))
      ) {
        return new DuplicatedUserError();
      }

      throw error;
    }
  }
}
