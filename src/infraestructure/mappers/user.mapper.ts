import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { Address } from "../../domain/value-objects/address.vo";

export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(record: any): User {
    return new User({
      id: record.id,
      name: record.name,
      email: Email.create(record.email),
      address: Address.create({
        street: record.street,
        city: record.city,
        state: record.state,
        zipCode: record.zipCode,
      }),
    });
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      zipCode: user.address.zipCode,
    };
  }
}
