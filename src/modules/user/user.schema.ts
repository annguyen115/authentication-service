import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './user.enum';
import { BaseDocument } from '@modules/base/base.schema';

@Schema()
export class User extends BaseDocument {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ default: false })
  isActive?: boolean;

  @Prop({ required: true, type: String, enum: Role, default: [Role.USER] })
  roles: string[];

  @Prop()
  lastLogin?: Date;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = User & { _id: string };

export type UserDocument = User & Document;
