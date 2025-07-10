import { ErrorCode } from '@error/ErrorCode';

export class AppError extends Error {
  constructor(
    public statusCode: ErrorCode,
    public errorMessage: string,
  ) {
    super(errorMessage);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(ErrorCode.NOT_FOUND, message);
  }
}
