import { UserRepository } from '@/domain/contracts/user.repository'
import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email.vo'
import { Address } from '@/domain/value-objects/address.vo'
import { DuplicatedItem } from '@/helpers/errors/errors'
import { CreateUserInput, CreateUserOutput } from '../dtos/user.schema'
import { UserMapper } from '@/infraestructure/mappers/user.mapper'

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const existing = await this.repo.findByEmail(input.email)
    if (existing) throw new DuplicatedItem('Usuário já cadastrado')

    const user = new User({
      name: input.name,
      email: Email.create(input.email),
      address: Address.create(input.address),
    })

    return UserMapper.toCreateUserOutput(await this.repo.save(user))
  }
}
