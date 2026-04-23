import { IFinanceMetaRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { prisma } from "@/main/lib/prisma";

const toFinanceMeta = (financeMeta: {
  id: number;
  categoryId: number;
  expensePercent: number;
  limit: number;
  createdAt: Date;
  userId: string;
}): IFinanceMetaRepository.UpdateFinanceMetaResponse => ({
  id: financeMeta.id,
  categoryId: financeMeta.categoryId,
  expenseValue: financeMeta.expensePercent,
  limit: financeMeta.limit,
  createdAt: financeMeta.createdAt.toISOString(),
  userId: financeMeta.userId,
});

export class FinanceMetaRepositoryImpl implements IFinanceMetaRepository {
  async save(
    FinanceMeta_data: IFinanceMetaRepository.SaveFinanceMetaRequest,
  ): Promise<IFinanceMetaRepository.SaveFinanceMetaResponse> {
    const financeMeta = await prisma.financeMeta.create({
      data: FinanceMeta_data,
    });

    return financeMeta.id;
  }

  async findAll(
    _userId: IFinanceMetaRepository.FindAllFinanceMetaRequest,
  ): Promise<IFinanceMetaRepository.FindAllFinanceMetaResponse> {
    const metas = await prisma.financeMeta.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return metas.map(toFinanceMeta);
  }

  async update(
    FinanceMeta_data: IFinanceMetaRepository.UpdateFinanceMetaRequest,
  ): Promise<IFinanceMetaRepository.UpdateFinanceMetaResponse> {
    const { id, ...data } = FinanceMeta_data;

    const financeMeta = await prisma.financeMeta.update({
      where: {
        id,
      },
      data: {
        categoryId: data.categoryId,
        limit: data.limit,
        userId: data.userId,
      },
    });

    return toFinanceMeta(financeMeta);
  }

  async remove(
    id: IFinanceMetaRepository.RemoveFinanceMetaRequest,
  ): Promise<void> {
    await prisma.financeMeta.delete({
      where: {
        id,
      },
    });
  }
}

export const financeMetaRepository = new FinanceMetaRepositoryImpl()