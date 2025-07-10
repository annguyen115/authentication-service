import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '@decorators/roles.decorator';
import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/roles.guard';

export function Auth(...roles: string[]) {
  const effectiveRoles = roles.length > 0 ? roles : ['user'];

  return applyDecorators(UseGuards(AuthGuard, RolesGuard), Roles(...effectiveRoles));
}
