import { Category } from "@/domain/entities/category.entity";
import { FinanceGoal } from "@/domain/entities/financeGoal.entity";
import { User } from "@/domain/entities/user.entity";

export interface IFinanceGoalRepository {
  save(
    FinanceGoal_data: IFinanceGoalRepository.SaveFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.SaveFinanceGoalResponse>;

  findAll(
    userId: IFinanceGoalRepository.FindAllFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.FindAllFinanceGoalResponse>;

  update(
    FinanceGoal_data: IFinanceGoalRepository.UpdateFinanceGoalRequest,
  ): Promise<IFinanceGoalRepository.UpdateFinanceGoalResponse>;

  remove(id: IFinanceGoalRepository.RemoveFinanceGoalRequest): Promise<void>;
}

export namespace IFinanceGoalRepository {
  export type FindAllFinanceGoalRequest = {
    userId: User["id"];
    periodMonth: number;
    periodYear: number;
  };
  export type RemoveFinanceGoalRequest = FinanceGoal["id"];
  export type SaveFinanceGoalRequest = Omit<FinanceGoal, "createdAt" | "id">;
  export type UpdateFinanceGoalRequest = Pick<FinanceGoal, "id"> &
    Partial<Omit<FinanceGoal, "createdAt" | "userId">>;

  export type SaveFinanceGoalResponse = FinanceGoal["id"];
  export type FindAllFinanceGoalResponse = (Omit<
    FinanceGoal,
    "userId" | "categoryId" | "createdAt"
  > & {
    category: Pick<Category, "name" | "color" | "emoji">;
    currentValue: number;
  })[];
  export type UpdateFinanceGoalResponse = FinanceGoal;
}
