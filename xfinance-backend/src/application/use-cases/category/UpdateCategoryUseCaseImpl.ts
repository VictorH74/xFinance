import { ICategoryRepository } from "@/application/interfaces/repositories/category.repository";
import { UpdateCategoryUseCaseI } from "@/application/interfaces/use-cases/category/UpdateCategoryUseCase";

export class UpdateCategoryUseCaseImpl implements UpdateCategoryUseCaseI {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(
    reqBody: UpdateCategoryUseCaseI.Request,
  ): Promise<UpdateCategoryUseCaseI.Response> {
    return this.repository.update(reqBody);
  }
}
