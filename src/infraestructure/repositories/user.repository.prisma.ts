import { prisma } from '../prisma/client'
import { User } from '@/domain/entities/user.entity'
import { UserRepository } from '@/domain/contracts/user.repository'
import { Address } from '@/domain/value-objects/address.vo'
import { Email } from '@/domain/value-objects/email.vo'
import { DuplicatedItem } from '@/helpers/errors/errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class UserRepositoryPrisma implements UserRepository {
  async disconnect(): Promise<void> {
    await prisma.$disconnect()
  }

  async save(user: User): Promise<User> {
    try {
      const record = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email.value,
          street: user.address.street,
          city: user.address.city,
          state: user.address.state,
          zipCode: user.address.zipCode,
        },
      })

      return this.toDomain(record)
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new DuplicatedItem('Usuário já cadastrado')
      }

      throw error
    }
  }

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } })
    return record ? this.toDomain(record) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } })
    return record ? this.toDomain(record) : null
  }

  private toDomain(record: {
    id: string
    name: string
    email: string
    street: string
    city: string
    state: string
    zipCode: string
  }): User {
    return User.rehydrate({
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
}
