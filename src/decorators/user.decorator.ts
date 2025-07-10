import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '@shared/types/user-payload';
import { ErrorMessage } from '@error/ErrorCode';
import { UnauthorizedError } from '@error/AppError';

export const User = createParamDecorator((field: keyof UserPayload | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request & { user?: any }>();
  const user = request.user as UserPayload;

  if (!user) {
    throw new UnauthorizedError(ErrorMessage.MISSING_TOKEN);
  }

  return field ? user?.[field] : user;
});
