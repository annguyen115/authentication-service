// Gắn user info vào req nếu token hợp lệ
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@utils/auth';
import { UnauthorizedError } from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';
import { UserPayload } from '@/types/user-payload';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedError(ErrorMessage.MISSING_TOKEN);

    try {
      req.user = verifyToken(token) as UserPayload;
      next();
    } catch {
      throw new UnauthorizedError(ErrorMessage.INVALID_TOKEN);
    }
  }
}
