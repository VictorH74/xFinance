import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { CreateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/CreateFinanceMetaUseCase";

export class CreateFinanceGoalUseCaseImpl implements CreateFinanceGoalUseCaseI {
  constructor(private readonly repository: IFinanceGoalRepository) {}

  async execute(
    reqBody: CreateFinanceGoalUseCaseI.Request,
  ): Promise<CreateFinanceGoalUseCaseI.Response> {
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
