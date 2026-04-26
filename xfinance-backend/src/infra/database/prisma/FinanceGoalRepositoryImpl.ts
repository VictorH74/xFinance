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

export class FinanceGoalRepositoryImpl implements IFinanceGoalRepository {
  async save(
    FinanceGoal_data: IFinanceGoalRepository.SaveFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.SaveFinanceGoalResponse> {
    const financeGoal = await prisma.financeGoal.create({
      data: FinanceGoal_data,
    });

    return financeGoal.id;
  }

  // TODO: user category obj (id, name, emoji, color) instead categoryId
  async findAll(
    _userId: IFinanceGoalRepository.FindAllFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.FindAllFinanceGoalResponse> {
    const goals = await prisma.financeGoal.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return goals
    // return goals.map(toFinanceGoal);
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

    return financeGoal
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

export const financeGoalRepository = new FinanceGoalRepositoryImpl()