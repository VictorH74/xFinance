import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { hashPassword } from "@/main/security/password";

export class CreateUserUseCaseImpl implements CreateUserUseCaseI {
  constructor(private readonly UserRepository: IUserRepository) {}

  async execute(
    reqBody: CreateUserUseCaseI.Request,
  ): Promise<CreateUserUseCaseI.Response> {
    const existingUser = await this.UserRepository.findByEmail(reqBody.email);

    if (existingUser) {
      return new DuplicatedUserError();
    }

    const user = await this.UserRepository.save({
      ...reqBody,
      password: hashPassword(reqBody.password),
    });

    return user;
  }
}
