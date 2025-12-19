/**
 * Erros específicos (podem ser lançados dentro de entidades, usecases ou repositórios)
 */

import { BaseError } from './base.error'
import { HttpStatusCodeEnum } from '../enum/http_status_code_enum'

export class DomainError extends BaseError {
  constructor(message: string, details?: unknown) {
    super(message, HttpStatusCodeEnum.BAD_REQUEST, details)
  }
}
