import { prisma } from '../prisma/client'
import { User } from '@/domain/entities/user.entity'
import { UserMapper } from '../mappers/user.mapper'
import { UserRepository } from '@/domain/contracts/user.repository'

export class UserRepositoryPrisma implements UserRepository {
  async save(user: User): Promise<User> {
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
    return UserMapper.toDomain(record)
  }

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } })
    return record ? UserMapper.toDomain(record) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } })
    return record ? UserMapper.toDomain(record) : null
  }
}
