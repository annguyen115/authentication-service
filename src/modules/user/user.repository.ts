import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsernameOrEmail({ email, username }: { email: string; username: string }): Promise<User | null> {
    return this.userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.userModel.findOne({ refreshToken: refreshToken });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id }, { $set: { refreshToken: refreshToken, lastLogin: Date.now() } });
  }

  async removeRefreshToken(id: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id }, { $unset: { refreshToken: null } });
  }
}
