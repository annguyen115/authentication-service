import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@/shared/enums/Role.unum';
import { BaseDocument, BaseModel, toJSONTransform } from '@modules/base/base.schema';

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

  @Prop({ required: true, type: [String], enum: Role, default: [Role.USER] })
  roles: Role[];

  @Prop()
  lastLogin?: Date;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = User & BaseModel;

export type UserDocument = User & Document;

UserSchema.set('toJSON', toJSONTransform());
