import { User } from "@/domain/entities/user";

export interface IUserRepository {
  save(
    userData: IUserRepository.SaveUserRequest,
  ): Promise<IUserRepository.SaveUserResponse>;

  update(
    userData: IUserRepository.UpdateUserRequest,
  ): Promise<IUserRepository.UpdateUserResponse>;

  remove(userId: IUserRepository.RemoveUserRequest): Promise<void>;
}

export namespace IUserRepository {
  export type RemoveUserRequest = User["id"];
  export type SaveUserRequest = Omit<User, "createdAt">;
  export type UpdateUserRequest = Pick<User, "name" | "id" >;

  export type SaveUserResponse = Omit<User, "password">;
  export type UpdateUserResponse = Omit<User, "password">;
}
