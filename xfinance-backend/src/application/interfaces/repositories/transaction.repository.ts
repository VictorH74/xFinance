import { Transaction } from "@/domain/entities/transaction";
import { User } from "@/domain/entities/user";

export interface ITransactionRepository {
  save(
    Transaction_data: ITransactionRepository.SaveTransactionRequest,
  ): Promise<ITransactionRepository.SaveTransactionResponse>;

  findAll(
    userId: ITransactionRepository.FindAllTransactionRequest,
  ): Promise<ITransactionRepository.FindAllTransactionResponse>;

  update(
    Transaction_data: ITransactionRepository.UpdateTransactionRequest,
  ): Promise<ITransactionRepository.UpdateTransactionResponse>;

  remove(id: ITransactionRepository.RemoveTransactionRequest): Promise<void>;
}

export namespace ITransactionRepository {
  export type RemoveTransactionRequest = Transaction["id"];
  export type SaveTransactionRequest = Omit<Transaction, "createdAt" | "id">;
  export type FindAllTransactionRequest = User["id"];
  export type UpdateTransactionRequest = Pick<Transaction, "id"> &
    Partial<Omit<Transaction, "createdAt" | "userId">>;

  export type SaveTransactionResponse = Transaction["id"];
  export type FindAllTransactionResponse = Transaction[];
  export type UpdateTransactionResponse = Transaction;
}
