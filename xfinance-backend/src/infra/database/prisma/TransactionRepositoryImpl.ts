import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { prisma } from "@/main/lib/prisma";

// const toTransaction = (transaction: {
//   id: number;
//   price: number;
//   categoryId: number;
//   type: string;
//   note: string | null;
//   userId: string;
//   date: Date;
// }): ITransactionRepository.UpdateTransactionResponse => ({
//   id: transaction.id,
//   price: transaction.price,
//   categoryId: transaction.categoryId,
//   type: transaction.type,
//   note: transaction.note ?? undefined,
//   userId: transaction.userId,
//   date: transaction.date.toISOString(),
// });

export class TransactionRepositoryImpl implements ITransactionRepository {
  async save(
    Transaction_data: ITransactionRepository.SaveTransactionRequest,
  ): Promise<ITransactionRepository.SaveTransactionResponse> {
    const transaction = await prisma.transaction.create({
      data: Transaction_data,
    });

    return transaction.id;
  }

  async findAll(
    userId: ITransactionRepository.FindAllTransactionRequest,
  ): Promise<ITransactionRepository.FindAllTransactionResponse> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        // date: { gte: new Date("2026-01-15"), },
      },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        description: true,
        amount: true,
        type: true,
        date: true,
        source: true,
        category: {
          select: {
            id: true,
            name: true,
            emoji: true,
            color: true,
          },
        },
      },
    });

    return transactions;
    // return transactions.map(toTransaction);
  }

  async update(
    Transaction_data: ITransactionRepository.UpdateTransactionRequest,
  ): Promise<ITransactionRepository.UpdateTransactionResponse> {
    const { id, ...data } =
      Transaction_data as ITransactionRepository.UpdateTransactionRequest;

    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data,
    });

    return transaction;
    // return toTransaction(transaction);
  }

  async remove(
    id: ITransactionRepository.RemoveTransactionRequest,
  ): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}

export const transactionRepository = new TransactionRepositoryImpl();
