import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestPayloadDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
