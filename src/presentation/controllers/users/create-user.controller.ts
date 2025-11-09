import { CreateUserUseCase } from '@/application/users/create-user.usecase'
import {
  CreateUserInput,
  CreateUserOutput,
} from '@/presentation/schemas/user.schema'
import { FastifyRequest, FastifyReply } from 'fastify'

export function createUserController(usecase: CreateUserUseCase) {
  return async function (
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply<{ Reply: CreateUserOutput }>
  ) {
    const { name, email, address } = request.body

    const response = await usecase.execute({
      name,
      email,
      address,
    })

    return reply.status(201).send({
      id: response.id!,
      name: response.name,
      email: response.email.value,
      address: {
        street: response.address.street,
        city: response.address.city,
        state: response.address.state,
        zipCode: response.address.zipCode,
      },
    })
  }
}
