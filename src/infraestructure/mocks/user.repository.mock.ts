import { UserRepository } from '@/domain/contracts/user.repository'
import { User } from '@/domain/entities/user.entity'
import { v4 as uuid } from 'uuid'

export class UserRepositoryMock implements UserRepository {
  users: User[] = []

  save(user: User): Promise<User> {
    const userWithId = new User({
      ...user,
      id: uuid(),
    })
    this.users.push(userWithId)
    return Promise.resolve(userWithId)
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)
    return Promise.resolve(user || null)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email.equals(email))
    return Promise.resolve(user || null)
  }
}
