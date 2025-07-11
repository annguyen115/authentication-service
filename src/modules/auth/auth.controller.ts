import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { Auth } from '@decorators/auth.decorator';
import { LoginRequestPayloadDto } from '@modules/auth/dto/login.dto';
import { RefreshTokenRequestPayloadDto } from '@modules/auth/dto/refresh-token.dto';
import { Role } from '@/shared/enums/Role.unum';
import { User } from '@decorators/user.decorator';
import { BaseController } from '@modules/base/base.controller';
import { UserPayload } from '@shared/types/user-payload';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('register')
  register() {
    this.authService.register();
    return { message: 'Register successful' };
  }

  @Post('login')
  login(@Body() dto: LoginRequestPayloadDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenRequestPayloadDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(200)
  @Auth()
  async logout(@User('id') id: string) {
    await this.authService.logout(id);
    return this.message('Logout successful');
  }

  @Get('me')
  @Auth(Role.ADMIN)
  getProfile(@Req() req: Request): UserPayload | undefined {
    return (req as Request & { user: UserPayload }).user;
  }
}
