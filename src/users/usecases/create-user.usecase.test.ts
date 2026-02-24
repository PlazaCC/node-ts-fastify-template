import { describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user.usecase'
import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'
import { DuplicatedItem } from '@/helpers/errors/errors'

describe('CreateUserUseCase', () => {
  it('deve criar usuário com sucesso', async () => {
    const repository = new UserRepositoryMock()
    const useCase = new CreateUserUseCase(repository)

    const output = await useCase.execute({
      name: 'João Silva',
      email: 'joao@email.com',
      address: {
        street: 'Rua A',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
      },
    })

    expect(output.id).toBeDefined()
    expect(output.email).toBe('joao@email.com')
    expect(output.address.city).toBe('São Paulo')
  })

  it('deve lançar DuplicatedItem para email duplicado', async () => {
    const repository = new UserRepositoryMock()
    const useCase = new CreateUserUseCase(repository)

    const input = {
      name: 'Maria Souza',
      email: 'maria@email.com',
      address: {
        street: 'Rua B',
        city: 'Recife',
        state: 'PE',
        zipCode: '87654321',
      },
    }

    await useCase.execute(input)

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(DuplicatedItem)
  })
})
