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

  constructor(props: UserProps) {
    if (!props.name) throw new EntityError('Nome é obrigatório')
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.address = props.address
  }
}
