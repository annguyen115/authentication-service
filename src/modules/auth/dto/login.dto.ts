import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { isEmpty } from 'lodash/fp';

export class LoginRequestPayloadDto {
  @IsString()
  @ValidateIf((o: LoginRequestPayloadDto) => isEmpty(o.username))
  @IsNotEmpty()
  email: string;

  @IsString()
  @ValidateIf((o: LoginRequestPayloadDto) => isEmpty(o.email))
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
