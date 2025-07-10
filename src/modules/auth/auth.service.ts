import { Injectable } from '@nestjs/common';
import { JwtExpiresIn, signToken, verifyToken } from '@utils/auth';
import { appConfig } from '@config/config';
import { UserPayload } from '@/types/user-payload';
import { UnauthorizedError } from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';

@Injectable()
export class AuthService {
  register(dto: any) {
    // TODO: check email, hash password, save user to DB
  }

  login(dto: any) {
    // TODO: find user, compare password
    const user = { id: '1', username: 'harry', roles: ['user'] };

    const accessToken = signToken(user, appConfig.auth.accessTokenExpire as JwtExpiresIn);
    const refreshToken = signToken(user, appConfig.auth.refreshTokenExpire as JwtExpiresIn);

    return { accessToken, refreshToken };
  }

  refreshToken(token: string) {
    try {
      const user = verifyToken(token);
      const newAccessToken = signToken(user as UserPayload, appConfig.auth.accessTokenExpire as JwtExpiresIn);
      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedError(ErrorMessage.INVALID_TOKEN);
    }
  }

  logout(token: string) {
    return { message: 'Logged out successfully' };
  }
}
