import { CreateUserUseCase } from '@/users/usecases/create-user.usecase'
import { CreateUserInput, CreateUserOutput } from '@/users/dtos/user.schema'
import { FastifyRequest, FastifyReply } from 'fastify'

export function createUserController(usecase: CreateUserUseCase) {
  return async function (
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    const { name, email, address } = request.body

    const response = await usecase.execute({
      name,
      email,
      address,
    })

    return reply.status(201).send(response)
  }
}
