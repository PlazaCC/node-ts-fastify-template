/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance, FastifyError } from "fastify";
import { ZodError } from "zod";
import { BaseError } from "helpers/errors/errors";

export function registerErrorHandler(fastify: FastifyInstance): void {
  fastify.setErrorHandler(
    (error: FastifyError | ZodError | BaseError, request, reply) => {
      const path = request.url;
      const timestamp = new Date().toISOString();

      // 1️⃣ Erros de validação (Zod ou Fastify core)
      if (error instanceof ZodError || (error as any).validation) {
        const messages =
          error instanceof ZodError
            ? error.errors.map((e) => e.message)
            : (error as any).validation.map((v: any) => v.message);

        return reply.status(400).send({
          error: "BadRequest",
          messages,
          statusCode: 400,
          timestamp,
          path,
        });
      }

      // 2️⃣ Erros de domínio/aplicação
      if (error instanceof BaseError) {
        return reply.status(error.statusCode).send({
          error: error.name,
          message: error.message,
          details: error.details,
          statusCode: error.statusCode,
          timestamp,
          path,
        });
      }

      // 3️⃣ Erros inesperados
      request.log.error({
        msg: "Unhandled error",
        error,
        path,
      });

      return reply.status(500).send({
        error: "InternalServerError",
        message: error.message || "Erro interno inesperado",
        statusCode: 500,
        timestamp,
        path,
      });
    }
  );
}
