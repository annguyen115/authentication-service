import { Injectable } from '@nestjs/common';
import { comparePassword, JwtExpiresIn, signToken, verifyToken } from '@utils/auth';
import { appConfig } from '@config/config';
import { UnauthorizedError } from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';
import { LoginRequestPayloadDto } from '@modules/auth/dto/login.dto';
import { isEmpty } from 'lodash/fp';
import { UserRepository } from '@modules/user/user.repository';
import { UserModel } from '@modules/user/user.schema';
import { UserPayload } from '@shared/types/user-payload';
import { Role } from '@shared/enums/Role.unum';
import { LogService } from '@modules/log/log.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logService: LogService,
  ) {}

  register() {
    // TODO: check email, hash password, save user to DB
  }

  async login(dto: LoginRequestPayloadDto) {
    const { username, email, password } = dto;

    // validate user from database
    this.logService.info(`Login with username: ${username}, email: ${email}`);
    const user = await this.validateUser({ username, email, password });

    // generate accessToken & refreshToken
    const [accessToken, refreshToken] = await this.generateToken({
      id: user.id as string,
      username: user.username,
      roles: user.roles,
    });

    this.logService.info(`Login successful with username: ${accessToken}, email: ${refreshToken}`);

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const user = await this.userRepository.findByRefreshToken(token);

    if (isEmpty(user)) {
      throw new UnauthorizedError(ErrorMessage.INVALID_TOKEN);
    }

    try {
      const userPayload = verifyToken(token);
      const newAccessToken = signToken(userPayload as UserPayload, appConfig.auth.accessTokenExpire as JwtExpiresIn);
      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedError(ErrorMessage.INVALID_TOKEN);
    }
  }

  async logout(id: string): Promise<void> {
    await this.userRepository.removeRefreshToken(id);
  }

  private async validateUser({ email, username, password }: { email: string; username: string; password: string }): Promise<UserModel> {
    const user = await this.userRepository.findByUsernameOrEmail({ username, email });

    if (isEmpty(user)) {
      throw new UnauthorizedError(ErrorMessage.INVALID_CREDENTIALS);
    }

    const passwordsMatch = await comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedError(ErrorMessage.INVALID_CREDENTIALS);
    }

    return user.toJSON() as UserModel;
  }

  private async generateToken({ username, roles, id }: { username: string; roles: Role[]; id: string }): Promise<[string, string]> {
    const tokenPayload: UserPayload = {
      username: username,
      roles: roles,
      id: id,
    };

    const accessToken = signToken(tokenPayload, appConfig.auth.accessTokenExpire as JwtExpiresIn);
    const refreshToken = signToken(tokenPayload, appConfig.auth.refreshTokenExpire as JwtExpiresIn);

    await this.userRepository.updateRefreshToken(id, refreshToken);

    return [accessToken, refreshToken];
  }
}
