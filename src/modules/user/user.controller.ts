import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '@modules/base/base.controller';
import { NotFoundError } from '@error/AppError';

@Controller('users')
export class UserController extends BaseController {
  @Get()
  @HttpCode(HttpStatus.CREATED)
  createUser() {
    throw new NotFoundError('User not found');
    return this.message('Create user successful');
  }
}
