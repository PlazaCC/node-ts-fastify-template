import { describe, expect, it } from 'vitest'
import { buildApp } from '@/app'
import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'

describe('POST /users', () => {
  it('deve retornar 201 para payload válido', async () => {
    const app = buildApp({
      userRepository: new UserRepositoryMock(),
      shutdown: async () => Promise.resolve(),
    })

    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'Ana Pereira',
        email: 'ana@email.com',
        address: {
          street: 'Rua C',
          city: 'Fortaleza',
          state: 'CE',
          zipCode: '11223344',
        },
      },
    })

    expect(response.statusCode).toBe(201)
    expect(response.json()).toMatchObject({
      name: 'Ana Pereira',
      email: 'ana@email.com',
    })

    await app.close()
  })

  it('deve retornar 400 para payload inválido', async () => {
    const app = buildApp({
      userRepository: new UserRepositoryMock(),
      shutdown: async () => Promise.resolve(),
    })

    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'A',
        email: 'invalido',
        address: {
          street: 'Rua D',
          city: 'Manaus',
          state: 'AM',
          zipCode: '123',
        },
      },
    })

    expect(response.statusCode).toBe(400)

    await app.close()
  })
})
