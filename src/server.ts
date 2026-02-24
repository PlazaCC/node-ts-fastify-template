import 'reflect-metadata'
import dotenv from 'dotenv'
import { Environments, STAGE } from './helpers/config/environments'
import { createUserRepository } from './composition/user-repository.factory'
import { buildApp } from './app'

dotenv.config({ path: process.env.ENV_FILE || '../.env' })

const dependencies = createUserRepository(Environments.stage || STAGE.DEV)
const server = buildApp(dependencies)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(
      `📚 API Documentation available at http://localhost:${PORT}/docs`
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

void start()
