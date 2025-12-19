export interface CreateUserDTO {
  name: string
  email: string
  address: {
    street: string
    city: string
    zipCode: string
  }
}
