import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { prisma } from "@/main/lib/prisma";

const toTransaction = (transaction: {
  id: number;
  price: number;
  categoryId: number;
  type: string;
  note: string | null;
  userId: string;
  date: Date;
}): ITransactionRepository.UpdateTransactionResponse => ({
  id: transaction.id,
  price: transaction.price,
  categoryId: transaction.categoryId,
  type: transaction.type,
  note: transaction.note ?? undefined,
  userId: transaction.userId,
  date: transaction.date.toISOString(),
});

export class TransactionRepositoryImpl implements ITransactionRepository {
  async save(
    Transaction_data: ITransactionRepository.SaveTransactionRequest,
  ): Promise<ITransactionRepository.SaveTransactionResponse> {
    const { userId, ...data } = Transaction_data as ITransactionRepository.SaveTransactionRequest

    const transaction = await prisma.transaction.create({
      data: {
        price: data.price,
        categoryId: data.categoryId,
        type: data.type,
        note: data.note || null,
        userId,
        date: new Date(data.date),
      },
    });

    return transaction.id;
  }

  async findAll(
    userId: ITransactionRepository.FindAllTransactionRequest,
  ): Promise<ITransactionRepository.FindAllTransactionResponse> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return transactions.map(toTransaction);
  }

  async update(
    Transaction_data: ITransactionRepository.UpdateTransactionRequest,
  ): Promise<ITransactionRepository.UpdateTransactionResponse> {
    const { id, ...data } = Transaction_data as ITransactionRepository.UpdateTransactionRequest

    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        price: data.price,
        categoryId: data.categoryId,
        type: data.type,
        note: data.note || null,
        date: new Date(data.date),
      },
    });

    return toTransaction(transaction);
  }

  async remove(id: ITransactionRepository.RemoveTransactionRequest): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}

export const transactionRepository = new TransactionRepositoryImpl()
