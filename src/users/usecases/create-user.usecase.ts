import { UserRepository } from '@/domain/contracts/user.repository'
import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email.vo'
import { Address } from '@/domain/value-objects/address.vo'
import { CreateUserInput, CreateUserOutput } from '../dtos/user.schema'

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User({
      name: input.name,
      email: Email.create(input.email),
      address: Address.create(input.address),
    })

    const savedUser = await this.repo.save(user)

    return {
      id: savedUser.id!,
      name: savedUser.name,
      email: savedUser.email.value,
      address: {
        street: savedUser.address.street,
        city: savedUser.address.city,
        state: savedUser.address.state,
        zipCode: savedUser.address.zipCode,
      },
    }
  }
}
