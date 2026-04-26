import { ICategoryRepository } from "@/application/interfaces/repositories/category.repository";
import { CreateCategoryUseCaseI } from "@/application/interfaces/use-cases/category/CreateCategoryUseCase";

export class CreateCategoryUseCaseImpl implements CreateCategoryUseCaseI {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(
    reqBody: CreateCategoryUseCaseI.Request,
  ): Promise<CreateCategoryUseCaseI.Response> {
    const obj = await this.repository.save(reqBody);

    return obj;
  }
}
