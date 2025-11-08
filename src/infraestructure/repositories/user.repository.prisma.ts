import { prisma } from "../prisma/client";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "domain/contracts/user.repository";
import { UserMapper } from "infraestructure/mappers/user.mapper";

export class UserRepositoryPrisma implements UserRepository {
  async save(user: User): Promise<User> {
    const data = UserMapper.toPersistence(user);
    const record = await prisma.user.create({ data });
    return UserMapper.toDomain(record);
  }

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } });
    return record ? UserMapper.toDomain(record) : null;
  }
}
