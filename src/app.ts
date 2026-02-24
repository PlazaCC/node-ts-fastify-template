import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import multipart from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { registerErrorHandler } from './helpers/middlewares/error_handler_middleware'
import { userRoutes } from './users/user.routes'
import { UserRepository } from './domain/contracts/user.repository'

interface BuildAppOptions {
  userRepository: UserRepository
  shutdown: () => Promise<void>
}

export function buildApp({ userRepository, shutdown }: BuildAppOptions) {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(multipart)
  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })

  app.get('/', async () => 'Node Typescript Fastify Template is running')

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Node Typescript Fastify Template API',
        description: 'API Template',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  app.register(userRoutes, {
    prefix: '/users',
    userRepository,
  })

  app.addHook('onClose', async () => {
    await shutdown()
  })

  registerErrorHandler(app)

  return app
}
