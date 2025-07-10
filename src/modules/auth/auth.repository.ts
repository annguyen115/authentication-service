import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsernameOrEmail({ email, username }: { email: string; username: string }) {
    return this.userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
  }
}
