import { DomainError } from '../errors/domain.error'

export interface AddressProps {
  street: string
  city: string
  state: string
  zipCode: string
}

export class Address {
  readonly street: string
  readonly city: string
  readonly state: string
  readonly zipCode: string

  private constructor(props: AddressProps) {
    Address.validate(props)

    this.street = props.street
    this.city = props.city
    this.state = props.state.toUpperCase()
    this.zipCode = props.zipCode
  }

  static create(props: AddressProps): Address {
    return new Address(props)
  }

  private static validate(props: AddressProps): void {
    const { street, city, state, zipCode } = props

    if (!street || !city || !state || !zipCode) {
      throw new DomainError('Endereço incompleto')
    }

    if (state.length !== 2) {
      throw new DomainError('Estado inválido')
    }

    if (!/^\d{8}$/.test(zipCode)) {
      throw new DomainError('CEP inválido')
    }
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.state === other.state &&
      this.zipCode === other.zipCode
    )
  }
}
