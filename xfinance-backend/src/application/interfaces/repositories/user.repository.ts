import { User } from "@/domain/entities/user";

export interface IUserRepository {
  save(
    userData: IUserRepository.SaveUserRequest,
  ): Promise<IUserRepository.SaveUserResponse>;

  findByEmail(
    email: IUserRepository.FindByEmailRequest,
  ): Promise<IUserRepository.FindByEmailResponse>;

  findById(
    userId: IUserRepository.FindByIdRequest,
  ): Promise<IUserRepository.FindByIdResponse>;

  update(
    userData: IUserRepository.UpdateUserRequest,
  ): Promise<IUserRepository.UpdateUserResponse>;

  remove(userId: IUserRepository.RemoveUserRequest): Promise<void>;
}

export namespace IUserRepository {
  export type FindByEmailRequest = User["email"];
  export type FindByIdRequest = User["id"];
  export type RemoveUserRequest = User["id"];
  export type SaveUserRequest = Omit<User, "createdAt" | "id">;
  export type UpdateUserRequest = Pick<User, "name" | "id" >;

  export type SaveUserResponse = Omit<User, "password">;
  export type UpdateUserResponse = Omit<User, "password">;
  export type FindByEmailResponse = User | null;
  export type FindByIdResponse = User | null;
}
