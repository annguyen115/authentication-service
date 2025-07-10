import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './AppError';
import { ErrorCode, ErrorHttpStatusMap, HttpStatusCode } from './ErrorCode';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      const httpCode = ErrorHttpStatusMap[exception.statusCode] || HttpStatusCode.INTERNAL_SERVER_ERROR;
      return response.status(httpCode).json({
        statusCode: exception.statusCode,
        errorMessage: exception.errorMessage,
      });
    }

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      return response.status(exception.getStatus()).json(
        typeof res === 'string'
          ? {
              statusCode: 'HTTP_ERROR',
              errorMessage: res,
            }
          : res,
      );
    }

    console.error('💥 Unhandled error', exception);
    response.status(500).json({
      statusCode: ErrorCode.INTERNAL,
      errorMessage: 'Something went wrong',
    });
  }
}
