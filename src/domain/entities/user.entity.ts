import { Email } from '../value-objects/email.vo'
import { Address } from '../value-objects/address.vo'
import { EntityError } from '@/helpers/errors/errors'

export interface UserProps {
  id?: string
  name: string
  email: Email
  address: Address
}

export class User {
  readonly id?: string
  readonly name: string
  readonly email: Email
  readonly address: Address

  private constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.address = props.address
  }

  static create(props: Omit<UserProps, 'id'>): User {
    const normalizedName = props.name.trim()

    if (!normalizedName) {
      throw new EntityError('Nome é obrigatório')
    }

    return new User({
      ...props,
      name: normalizedName,
    })
  }

  static rehydrate(props: UserProps): User {
    if (!props.id) {
      throw new EntityError('Id é obrigatório para rehidratar usuário')
    }

    return User.create(props)
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value,
      address: {
        street: this.address.street,
        city: this.address.city,
        state: this.address.state,
        zipCode: this.address.zipCode,
      },
    }
  }
}
