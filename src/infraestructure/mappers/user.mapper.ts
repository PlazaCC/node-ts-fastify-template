import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email.vo'
import { Address } from '@/domain/value-objects/address.vo'
import { CreateUserOutput } from '@/users/dtos/user.schema'

export class UserMapper {
  static toDomain(record: any): User {
    return new User({
      id: record.id,
      name: record.name,
      email: Email.create(record.email),
      address: Address.create({
        street: record.street,
        city: record.city,
        state: record.state,
        zipCode: record.zipCode,
      }),
    })
  }

  static toCreateUserOutput(user: User): CreateUserOutput {
    return {
      id: user.id!,
      name: user.name,
      email: user.email.value,
      address: {
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
      },
    }
  }
}
