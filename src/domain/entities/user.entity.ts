import { Email } from '../value-objects/email.vo'
import { Address } from '../value-objects/address.vo'
import { DomainError } from '../errors/domain.error'

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

  constructor(props: UserProps) {
    this.validateName(props.name)
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.address = props.address
  }

  private validateName(name: string) {
    if (name.length < 2) {
      throw new DomainError('Nome deve ter pelo menos 2 caracteres')
    }

    if (name.length > 100) {
      throw new DomainError('Nome deve ter no máximo 100 caracteres')
    }
  }
}
