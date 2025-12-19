import { BaseError } from './base.error'
import { HttpStatusCodeEnum } from '../enum/http_status_code_enum'

export class NoItemsFound extends BaseError {
  constructor(message: string, details?: unknown) {
    super(
      `Nenhum item encontrado: ${message}`,
      HttpStatusCodeEnum.NOT_FOUND,
      details
    )
  }
}

export class DuplicatedItem extends BaseError {
  constructor(message: string, details?: unknown) {
    super(`Itens duplicados: ${message}`, HttpStatusCodeEnum.CONFLICT, details)
  }
}

export class ForbiddenAction extends BaseError {
  constructor(message: string, details?: unknown) {
    super(`Ação proibida: ${message}`, HttpStatusCodeEnum.FORBIDDEN, details)
  }
}

export class ConflictItems extends BaseError {
  constructor(message: string, details?: unknown) {
    super(
      `Itens conflitantes: ${message}`,
      HttpStatusCodeEnum.CONFLICT,
      details
    )
  }
}

export class StorageException extends BaseError {
  constructor(message: string, details?: unknown) {
    super(
      `Storage Error: ${message}`,
      HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
      details
    )
  }
}
