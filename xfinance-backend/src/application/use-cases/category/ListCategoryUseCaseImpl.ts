import { ICategoryRepository } from "@/application/interfaces/repositories/category.repository";
import { ListCategoryUseCaseI } from "@/application/interfaces/use-cases/category/ListCategoryUseCase";

export class ListCategoryUseCaseImpl implements ListCategoryUseCaseI {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(
    reqBody: ListCategoryUseCaseI.Request,
  ): Promise<ListCategoryUseCaseI.Response> {
    return this.repository.findAll(reqBody);
  }
}