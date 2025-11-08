import { CreateUserUseCase } from "application/users/create-user.usecase";
import { UserRepositoryMock } from "infraestructure/mocks/user.repository.mock";
import { createUserController } from "presentation/controllers/users/create-user.controller";
import {
  CreateUserInput,
  createUserInputSchema,
  CreateUserOutput,
  createUserOutputSchema,
} from "presentation/schemas/user.schema";
import { FastifyTypedInstance } from "types";

export async function userRoutes(server: FastifyTypedInstance) {
  const userRepository = new UserRepositoryMock();

  server.post<{
    Body: CreateUserInput;
    Reply: CreateUserOutput;
  }>(
    "/",
    {
      schema: {
        tags: ["Users"],
        description: "Create a new user",
        body: createUserInputSchema,
        response: {
          201: createUserOutputSchema,
        },
      },
    },
    createUserController(new CreateUserUseCase(userRepository))
  );
}
