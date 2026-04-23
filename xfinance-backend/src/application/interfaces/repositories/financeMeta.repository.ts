import { FinanceMeta } from "@/domain/entities/financeMeta";
import { User } from "@/domain/entities/user";

export interface IFinanceMetaRepository {
  save(
    FinanceMeta_data: IFinanceMetaRepository.SaveFinanceMetaRequest,
  ): Promise<IFinanceMetaRepository.SaveFinanceMetaResponse>;

  findAll(
    userId: IFinanceMetaRepository.FindAllFinanceMetaRequest,
  ): Promise<IFinanceMetaRepository.FindAllFinanceMetaResponse>;

  update(
    FinanceMeta_data: IFinanceMetaRepository.UpdateFinanceMetaRequest,
  ): Promise<IFinanceMetaRepository.UpdateFinanceMetaResponse>;

  remove(
    id: IFinanceMetaRepository.RemoveFinanceMetaRequest,
  ): Promise<void>;
}

export namespace IFinanceMetaRepository {
  export type FindAllFinanceMetaRequest = User["id"];
  export type RemoveFinanceMetaRequest = FinanceMeta["id"];
  export type SaveFinanceMetaRequest = Omit<FinanceMeta, "createdAt" | "id">;
  export type UpdateFinanceMetaRequest = Omit<
    FinanceMeta,
    "createdAt" | "expenseValue"
  >;

  export type SaveFinanceMetaResponse = FinanceMeta["id"];
  export type FindAllFinanceMetaResponse = FinanceMeta[];
  export type UpdateFinanceMetaResponse = FinanceMeta;
}
