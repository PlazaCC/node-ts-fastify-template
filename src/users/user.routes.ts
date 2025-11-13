import { FastifyTypedInstance } from '@/helpers/config/types'
import { createUserInputDto, createUserOutputDto } from './dtos/user.schema'
import { CreateUserUseCase } from '@/users/usecases/create-user.usecase'
import { createUserController } from './controllers/create-user.controller'
import { container } from '@/helpers/di/container'
import { UserRepository } from '@/domain/contracts/user.repository'

export async function userRoutes(server: FastifyTypedInstance) {
  const userRepository = container.get<UserRepository>('UserRepository')
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
