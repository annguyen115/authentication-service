import { AppError } from '@error/AppError';
import { ErrorCode } from '@error/ErrorCode';

interface SuccessResponse<T> {
  data: T;
}

interface ErrorResponse {
  statusCode: string;
  errorMessage: string;
}

export async function handleResponse<T>(handler: () => Promise<T>): Promise<SuccessResponse<T> | ErrorResponse> {
  try {
    const data = await handler();
    return { data };
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        errorMessage: error.errorMessage,
      };
    }

    console.error('🔥 Unexpected Error:', error);
    return {
      statusCode: ErrorCode.INTERNAL,
      errorMessage: 'Something went wrong',
    };
  }
}
