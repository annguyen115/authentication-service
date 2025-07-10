// libs/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from '@/types/user-payload';
import { UnauthorizedError } from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';
import { verifyToken } from '@utils/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError(ErrorMessage.MISSING_OR_MALFORMED_TOKEN);
    }

    const token = authHeader.split(' ')[1];

    try {
      req.user = verifyToken(token) as UserPayload;
      return true;
    } catch {
      throw new UnauthorizedError(ErrorMessage.INVALID_TOKEN);
    }
  }
}
