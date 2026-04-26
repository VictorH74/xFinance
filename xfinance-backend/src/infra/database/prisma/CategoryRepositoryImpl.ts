import { ICategoryRepository } from "@/application/interfaces/repositories/category.repository";
import { prisma } from "@/main/lib/prisma";

// const toCategory = (category: {
//   id: number;
//   name: string;
//   iconName: string | null;
//   color: string;
//   createdAt: Date;
//   userId: string;
// }): ICategoryRepository.UpdateCategoryResponse => ({
//   id: String(category.id),
//   name: category.name,
//   iconName: category.iconName ?? "",
//   color: category.color,
//   createdAt: category.createdAt.toISOString(),
//   userId: category.userId,
// });

export class CategoryRepositoryImpl implements ICategoryRepository {
  async save(
    Category_data: ICategoryRepository.SaveCategoryRequest,
  ): Promise<ICategoryRepository.SaveCategoryResponse> {
    const category = await prisma.category.create({
      data: Category_data,
    });

    return String(category.id);
  }

  findAll(
    _userId: ICategoryRepository.FindAllCategoryRequest,
  ): ICategoryRepository.FindAllCategoryResponse {
    return prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    }) as unknown as ICategoryRepository.FindAllCategoryResponse;
    // .then((categories) =>
    //   categories.map(toCategory),
    // ) as unknown as ICategoryRepository.FindAllCategoryResponse;
  }

  async update(
    Category_data: ICategoryRepository.UpdateCategoryRequest,
  ): Promise<ICategoryRepository.UpdateCategoryResponse> {
    const { id, ...data } =
      Category_data as ICategoryRepository.UpdateCategoryRequest & {
        id?: string | number;
      };

    if (id === undefined) {
      throw new Error("Category update requires an id.");
    }

    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: { ...data, updatedAt: new Date() },
    });

    return category;
    // return toCategory(category);
  }

  async remove(id: ICategoryRepository.RemoveCategoryRequest): Promise<void> {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}

export const categoryRepository = new CategoryRepositoryImpl();
