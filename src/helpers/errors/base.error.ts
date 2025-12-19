import { HttpStatusCodeEnum } from '../enum/http_status_code_enum'

/**
 * Erro base de domínio/aplicação
 * Usado em toda a camada Application e Domain.
 */
export class BaseError extends Error {
  public readonly statusCode: number
  public readonly details?: unknown

  constructor(
    message: string,
    statusCode: number = HttpStatusCodeEnum.BAD_REQUEST,
    details?: unknown
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.details = details

    // Em dev, loga automaticamente
    if (process.env.NODE_ENV !== 'production') {
      this.logError()
    }
  }

  private logError(): void {
    console.error(
      `🛑 [${new Date().toISOString()}] ${this.name}: ${this.message}`
    )
  }
}
