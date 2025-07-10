import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@modules/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { CreateUserDto } from '@modules/user/user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto) {
    try {
      const existing = await this.userModel.findOne({ email: dto.email });

      if (existing) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const createdUser = new this.userModel({
        ...dto,
        password: hashedPassword,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return await createdUser.save();
    } catch (error) {
      console.error('❌ Error creating user:', error);
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}