import { HttpStatusCodeEnum } from "../enum/http_status_code_enum";

/**
 * Erro base de domínio/aplicação
 * Usado em toda a camada Application e Domain.
 */
export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = HttpStatusCodeEnum.BAD_REQUEST,
    details?: unknown
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;

    // Em dev, loga automaticamente
    if (process.env.NODE_ENV !== "production") {
      this.logError();
    }
  }

  private logError(): void {
    console.error(
      `🛑 [${new Date().toISOString()}] ${this.name}: ${this.message}`
    );
  }
}

/**
 * Erros específicos (podem ser lançados dentro de entidades, usecases ou repositórios)
 */

export class EntityError extends BaseError {
  constructor(message: string, details?: unknown) {
    super(message, HttpStatusCodeEnum.BAD_REQUEST, details);
  }
}

export class NoItemsFound extends BaseError {
  constructor(message: string, details?: unknown) {
    super(
      `Nenhum item encontrado: ${message}`,
      HttpStatusCodeEnum.NOT_FOUND,
      details
    );
  }
}

export class DuplicatedItem extends BaseError {
  constructor(message: string, details?: unknown) {
    super(`Itens duplicados: ${message}`, HttpStatusCodeEnum.CONFLICT, details);
  }
}

export class ForbiddenAction extends BaseError {
  constructor(message: string, details?: unknown) {
    super(`Ação proibida: ${message}`, HttpStatusCodeEnum.FORBIDDEN, details);
  }
}

export class ConflictItems extends BaseError {
  constructor(message: string, details?: unknown) {
    super(
      `Itens conflitantes: ${message}`,
      HttpStatusCodeEnum.CONFLICT,
      details
    );
  }
}

export class StorageException extends BaseError {
  constructor(message: string, details?: unknown) {
    super(
      `Storage Error: ${message}`,
      HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
      details
    );
  }
}
