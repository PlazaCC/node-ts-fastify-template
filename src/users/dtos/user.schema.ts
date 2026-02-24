import { z } from 'zod'

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string().length(2, 'Use sigla do estado, ex: SP'),
  zipCode: z.string().length(8, 'CEP deve ter 8 dígitos'),
})

const userSchema = z.object({
  id: z.string().uuid('ID inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  address: addressSchema,
})

// ✅ Entrada para criação
export const createUserInputDto = userSchema.omit({ id: true }).strict()

// ✅ Saída de criação
export const createUserOutputDto = userSchema

export type CreateUserInput = z.infer<typeof createUserInputDto>
export type CreateUserOutput = z.infer<typeof createUserOutputDto>
