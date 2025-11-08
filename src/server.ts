import "reflect-metadata";
import { fastify } from "fastify";
import { registerErrorHandler } from "./helpers/middlewares/error_handler_middleware";
import { fastifyCors } from "@fastify/cors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import dotenv from "dotenv";
import multipart from "@fastify/multipart";
import { userRoutes } from "presentation/routes/user.routes";

dotenv.config({ path: process.env.ENV_FILE || "../.env" });

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.register(multipart);

server.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

server.get("/", async () => {
  return "Node Typescript Fastify Template is running";
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Node Typescript Fastify Template API",
      description: "API Template",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(userRoutes, { prefix: "/users" });

registerErrorHandler(server);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const start = async () => {
  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(
      `📚 API Documentation available at http://localhost:${PORT}/docs`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
