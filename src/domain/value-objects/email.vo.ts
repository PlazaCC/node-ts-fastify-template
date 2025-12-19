import { DomainError } from '../errors/domain.error'

export class Email {
  private readonly value: string

  private constructor(value: string) {
    this.validate(value)
    this.value = value.toLowerCase()
  }

  static create(value: string): Email {
    return new Email(value)
  }

  private validate(email: string): void {
    if (!email || !email.includes('@') || email.length < 5) {
      throw new DomainError('Email inválido')
    }
  }

  equals(other: Email): boolean {
    return this.value === other.toString()
  }

  toString(): string {
    return this.value
  }
}
