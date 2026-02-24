import { UserRepository } from '@/domain/contracts/user.repository'
import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email.vo'
import { Address } from '@/domain/value-objects/address.vo'
import { CreateUserInput, CreateUserOutput } from '../dtos/user.schema'

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = User.create({
      name: input.name,
      email: Email.create(input.email),
      address: Address.create(input.address),
    })

    const savedUser = await this.repo.save(user)
    const userPrimitives = savedUser.toPrimitives()

    return {
      id: userPrimitives.id!,
      name: userPrimitives.name,
      email: userPrimitives.email,
      address: userPrimitives.address,
    }
  }
}
