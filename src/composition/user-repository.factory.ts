import { UserRepository } from '@/domain/contracts/user.repository'
import { STAGE } from '@/helpers/config/environments'
import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'
import { UserRepositoryPrisma } from '@/infraestructure/repositories/user.repository.prisma'

export interface UserRepositoryDependencies {
  userRepository: UserRepository
  shutdown: () => Promise<void>
}

export function createUserRepository(stage: STAGE): UserRepositoryDependencies {
  if (stage === STAGE.TEST) {
    return {
      userRepository: new UserRepositoryMock(),
      shutdown: async () => Promise.resolve(),
    }
  }

  const userRepository = new UserRepositoryPrisma()

  return {
    userRepository,
    shutdown: async () => userRepository.disconnect(),
  }
}
