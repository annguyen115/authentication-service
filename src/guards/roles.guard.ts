import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProhibitedError } from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';
import { UserPayload } from '@shared/types/user-payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);

    if (!requiredRoles) return true;

    const req = context.switchToHttp().getRequest<Request & { user: UserPayload }>();
    const user = req.user;

    if (!user?.roles?.length) {
      throw new ProhibitedError(ErrorMessage.ACCESS_DENIED);
    }

    const hasRole = user.roles.some(role => requiredRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(ErrorMessage.INSUFFICIENT_ROLE);
    }

    return true;
  }
}
