import { ICategoryRepository } from "@/application/interfaces/repositories/category.repository";
import { RemoveCategoryUseCaseI } from "@/application/interfaces/use-cases/category/RemoveCategoryUseCase";

export class RemoveCategoryUseCaseImpl implements RemoveCategoryUseCaseI {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(
    id: RemoveCategoryUseCaseI.Request,
  ): Promise<RemoveCategoryUseCaseI.Response> {
    return this.repository.remove(id);
  }
}
