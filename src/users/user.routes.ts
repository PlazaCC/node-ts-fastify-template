import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'
import { FastifyTypedInstance } from '@/types'
import {
  CreateUserInput,
  createUserInputDto,
  CreateUserOutput,
  createUserOutputDto,
} from './dtos/user.schema'
import { CreateUserUseCase } from '@/users/usecases/create-user.usecase'
import { createUserController } from './controllers/create-user.controller'

export async function userRoutes(server: FastifyTypedInstance) {
  const userRepository = new UserRepositoryMock()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  server.post(
    '/',
    {
      schema: {
        tags: ['Users'],
        description: 'Create a new user',
        body: createUserInputDto,
        response: {
          201: createUserOutputDto,
        },
      },
    },
    createUserController(createUserUseCase)
  )
}
