export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export class Address {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;

  private constructor(props: AddressProps) {
    if (!props.street || !props.city || !props.state || !props.zipCode) {
      throw new Error("Endereço incompleto");
    }

    this.street = props.street;
    this.city = props.city;
    this.state = props.state;
    this.zipCode = props.zipCode;
  }

  static create(props: AddressProps): Address {
    return new Address(props);
  }

  toString(): string {
    return `${this.street}, ${this.city} - ${this.state}, ${this.zipCode}`;
  }
}
