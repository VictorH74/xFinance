import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { prisma } from "@/main/lib/prisma";

const toUser = (user: {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}): IUserRepository.SaveUserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt.toISOString(),
});

export class UserRepositoryImpl implements IUserRepository {
  async save(
    userData: IUserRepository.SaveUserRequest,
  ): Promise<IUserRepository.SaveUserResponse> {
    const user = await prisma.user.create({
      data: userData
    });

    return toUser(user);
  }
  async update(
    userData: IUserRepository.UpdateUserRequest,
  ): Promise<IUserRepository.UpdateUserResponse> {
    const { id, ...data } = userData as IUserRepository.UpdateUserRequest;

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return toUser(user);
  }
  async remove(userId: IUserRepository.RemoveUserRequest): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

export const userRepository = new UserRepositoryImpl()