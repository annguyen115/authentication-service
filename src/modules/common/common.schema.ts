import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class CommonDocument extends Document {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
