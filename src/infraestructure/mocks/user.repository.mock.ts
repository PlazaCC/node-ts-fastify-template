import { UserRepository } from '@/domain/contracts/user.repository'
import { User } from '@/domain/entities/user.entity'
import { v4 as uuid } from 'uuid'
import { DuplicatedItem } from '@/helpers/errors/errors'

export class UserRepositoryMock implements UserRepository {
  users: User[] = []

  save(user: User): Promise<User> {
    const alreadyExists = this.users.some(
      (existingUser) => existingUser.email.value === user.email.value
    )

    if (alreadyExists) {
      throw new DuplicatedItem('Usuário já cadastrado')
    }

    const userWithId = User.rehydrate({
      id: uuid(),
      name: user.name,
      email: user.email,
      address: user.address,
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
