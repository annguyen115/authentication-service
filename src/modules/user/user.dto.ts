import { UserDocument } from '@modules/user/user.schema';

export class CreateUserDto implements Pick<UserDocument, 'username' | 'email' | 'password'> {
  email: string;
  password: string;
  username: string;
}
