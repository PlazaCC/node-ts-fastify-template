import { EntityError } from '@/helpers/errors/errors'

export class Email {
  private constructor(readonly value: string) {}

  static create(value: string): Email {
    if (!value || !value.includes('@') || value.length < 5) {
      throw new EntityError('Email inválido')
    }
    return new Email(value.toLowerCase())
  }

  equals(other: string): boolean {
    return this.value === other
  }

  toString(): string {
    return this.value
  }
}
