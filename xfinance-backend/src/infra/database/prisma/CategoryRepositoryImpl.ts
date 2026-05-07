import { ICategoryRepository } from "@/application/interfaces/repositories/category.repository";
import { Category } from "@/domain/entities/category.entity";
import { prisma } from "@/main/lib/prisma";

const toListableCategory = (
  category: {
    _count: {
      transactions: number;
      financeGoals: number;
    };
    currentMonthExpense: number;
  } & Category,
): ICategoryRepository.FindAllCategoryResponse[number] => ({
  id: category.id,
  name: category.name,
  localizedName: category.localizedName,
  emoji: category.emoji,
  color: category.color,
  userId: category.userId,
  hasActiveMeta: category._count.financeGoals > 0,
  transactionCount: category._count.transactions,
  isDefault: category.isDefault,
  currentMonthExpense: category.currentMonthExpense,
});

export class CategoryRepositoryImpl implements ICategoryRepository {
  async save(
    Category_data: ICategoryRepository.SaveCategoryRequest,
  ): Promise<ICategoryRepository.SaveCategoryResponse> {
    const category = await prisma.category.create({
      data: Category_data,
    });

    return category.id;
  }

  async findAll(
    userId: ICategoryRepository.FindAllCategoryRequest,
  ): Promise<ICategoryRepository.FindAllCategoryResponse> {
    const now = new Date();
    const currentMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    );
    const nextMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1,
    );

    const [categories, currentMonthExpenses] = await Promise.all([
      prisma.category.findMany({
        where: {
          userId,
        },
        orderBy: {
          id: "asc",
        },
        include: {
          _count: {
            select: {
              transactions: true,
              financeGoals: true,
            },
          },
        },
      }),
      prisma.transaction.groupBy({
        by: ["categoryId"],
        where: {
          userId,
          type: "expense",
          date: {
            gte: currentMonthStart,
            lt: nextMonthStart,
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    const currentMonthExpenseByCategory = new Map(
      currentMonthExpenses.map((item) => [item.categoryId, item._sum.amount ?? 0]),
    );

    return categories.map((category) =>
      toListableCategory({
        ...category,
        currentMonthExpense:
          currentMonthExpenseByCategory.get(category.id) ?? 0,
      }),
    );
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
