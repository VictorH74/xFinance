import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { prisma } from "@/main/lib/prisma";

// const toFinanceGoal = (financeGoal: {
//   id: string;
//   categoryId: string;
//   expensePercent: number;
//   limit: number;
//   createdAt: Date;
//   userId: string;
// }): IFinanceGoalRepository.UpdateFinanceGoalResponse => ({
//   id: financeGoal.id,
//   categoryId: financeGoal.categoryId,
//   expenseValue: financeGoal.expensePercent,
//   limit: financeGoal.limit,
//   createdAt: financeGoal.createdAt.toISOString(),
//   userId: financeGoal.userId,
// });

// TODO: delete goals with !isRecurring && periodMonth < currentMonth & periodYear < currentYear using cron

export class FinanceGoalRepositoryImpl implements IFinanceGoalRepository {
  async save(
    FinanceGoal_data: IFinanceGoalRepository.SaveFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.SaveFinanceGoalResponse> {
    const financeGoal = await prisma.financeGoal.create({
      data: FinanceGoal_data,
    });

    return financeGoal.id;
  }

  async findAll({
    userId,
    periodMonth,
    periodYear,
  }: IFinanceGoalRepository.FindAllFinanceGoalRequest): Promise<IFinanceGoalRepository.FindAllFinanceGoalResponse> {
    const [goals, spendingByCategory] = await Promise.all([
      prisma.financeGoal.findMany({
        where: { userId, 
          // periodMonth: Number(periodMonth), periodYear: Number(periodYear) 
        },
        orderBy: { id: "asc" },
        select: {
          id: true,
          amountLimit: true,
          periodMonth: true,
          periodYear: true,
          isRecurring: true,
          notificationAt: true,
          categoryId: true,
          category: {
            select: { color: true, name: true, emoji: true },
          },
        },
      }),

      // soma de transações agrupadas por categoria — mesmo período
      prisma.transaction.groupBy({
        by: ["categoryId"],
        where: {
          userId,
          type: "expense",
          // date: {
          //   gte: new Date(periodYear, periodMonth - 1, 1), // primeiro dia do mês
          //   lt: new Date(periodYear, periodMonth, 1), // primeiro dia do mês seguinte
          // },
        },
        _sum: { amount: true },
      }),
    ]);

    const spendingMap = new Map(
      spendingByCategory.map((s) => [s.categoryId, Number(s._sum.amount ?? 0)]),
    );

    console.log(goals)

    return goals.map((g) => ({
      id: g.id,
      amountLimit: Number(g.amountLimit),
      periodMonth: g.periodMonth,
      periodYear: g.periodYear,
      isRecurring: g.isRecurring,
      notificationAt: g.notificationAt,
      category: {
        color: g.category?.color ?? "",
        emoji: g.category?.emoji ?? "",
        name: g.category?.name ?? "",
      },
      currentValue: spendingMap.get(g.categoryId ?? "") ?? 0,
    }));
  }

  async update(
    FinanceGoal_data: IFinanceGoalRepository.UpdateFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.UpdateFinanceGoalResponse> {
    const { id, ...data } = FinanceGoal_data;

    const financeGoal = await prisma.financeGoal.update({
      where: {
        id,
      },
      data,
    });

    return financeGoal;
    // return toFinanceGoal(financeGoal);
  }

  async remove(
    id: IFinanceGoalRepository.RemoveFinanceGoalRequest,
  ): Promise<void> {
    await prisma.financeGoal.delete({
      where: {
        id,
      },
    });
  }
}

export const financeGoalRepository = new FinanceGoalRepositoryImpl();
