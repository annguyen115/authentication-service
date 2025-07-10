import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { LogoutRequestDto, RefreshTokenRequestDto } from '@modules/auth/auth.interface';
import { UserPayload } from '@/types/user-payload';
import { Auth } from '@decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: any) {
    this.authService.register(dto);
    return { message: 'Register successful' };
  }

  @Post('login')
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenRequestDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  logout(@Body() dto: LogoutRequestDto) {
    return this.authService.logout(dto.refreshToken);
  }

  @Get('me')
  @Auth('admin')
  getProfile(@Req() req: Request): UserPayload | undefined {
    return (req as Request & { user: UserPayload }).user;
  }
}
