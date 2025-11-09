import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'
import { FastifyTypedInstance } from '@/types'
import {
  CreateUserInput,
  createUserInputSchema,
  CreateUserOutput,
  createUserOutputSchema,
} from '../schemas/user.schema'
import { CreateUserUseCase } from '@/application/users/create-user.usecase'
import { createUserController } from '../controllers/users/create-user.controller'

export async function userRoutes(server: FastifyTypedInstance) {
  const userRepository = new UserRepositoryMock()

  server.post<{
    Body: CreateUserInput
    Reply: CreateUserOutput
  }>(
    '/',
    {
      schema: {
        tags: ['Users'],
        description: 'Create a new user',
        body: createUserInputSchema,
        response: {
          201: createUserOutputSchema,
        },
      },
    },
    createUserController(new CreateUserUseCase(userRepository))
  )
}
