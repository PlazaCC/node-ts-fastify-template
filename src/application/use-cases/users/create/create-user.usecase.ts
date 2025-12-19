import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email.vo'
import { Address } from '@/domain/value-objects/address.vo'
import { UserRepository } from '@/domain/contracts/user.repository'

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<UserOutput> {
    const user = new User({
      name: input.name,
      email: new Email(input.email),
      address: new Address(input.address),
    })

    await this.userRepository.save(user)

    return mapUserToOutput(user)
  }
}
