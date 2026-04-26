import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { prisma } from "@/main/lib/prisma";

const toUser = (user: {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}): IUserRepository.FindByEmailResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  password: user.password,
  createdAt: user.createdAt.toISOString(),
});

const toPublicUser = (
  user: NonNullable<IUserRepository.FindByEmailResponse>,
): IUserRepository.SaveUserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

export class UserRepositoryImpl implements IUserRepository {
  async save(
    userData: IUserRepository.SaveUserRequest,
  ): Promise<IUserRepository.SaveUserResponse> {
    const user = await prisma.user.create({
      data: userData
    });

    return toPublicUser(toUser(user)!);
  }

  async findByEmail(
    email: IUserRepository.FindByEmailRequest,
  ): Promise<IUserRepository.FindByEmailResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user ? toUser(user) : null;
  }

  async findById(
    userId: IUserRepository.FindByIdRequest,
  ): Promise<IUserRepository.FindByIdResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? toUser(user) : null;
  }

  async update(
    userData: IUserRepository.UpdateUserRequest,
  ): Promise<IUserRepository.UpdateUserResponse> {
    const { id, ...data } = userData as IUserRepository.UpdateUserRequest;

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return toPublicUser(toUser(user)!);
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
