import { UserRepository } from "../../domain/contracts/user.repository";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { Address } from "../../domain/value-objects/address.vo";
import { CreateUserInput } from "../../presentation/schemas/user.schema";
import { DuplicatedItem } from "helpers/errors/errors";

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new DuplicatedItem("Usuário já cadastrado");

    const user = new User({
      name: input.name,
      email: Email.create(input.email),
      address: Address.create(input.address),
    });

    return await this.repo.save(user);
  }
}
