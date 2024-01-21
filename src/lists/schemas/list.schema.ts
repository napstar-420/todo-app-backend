import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type UserSchema = HydratedDocument<List>;

@Schema()
export class List {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 111 })
  color: number; // Hexadecimal

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;
}

const ListSchema = SchemaFactory.createForClass(List);

export { ListSchema };
