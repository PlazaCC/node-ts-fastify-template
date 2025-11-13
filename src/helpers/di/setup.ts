import { container } from './container'
import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'
import { UserRepositoryPrisma } from '@/infraestructure/repositories/user.repository.prisma'
import { Environments, STAGE } from '../config/environments'

export function setupDependencies() {
  // Registra o repositório baseado no ambiente
  if (Environments.stage === STAGE.PROD) {
    container.register('UserRepository', new UserRepositoryPrisma())
  } else {
    container.register('UserRepository', new UserRepositoryMock())
  }
}
