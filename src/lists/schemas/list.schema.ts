import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserSchema = HydratedDocument<List>;

@Schema()
export class List {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 111 })
  color: number; // Hexadecimal
}

const ListSchema = SchemaFactory.createForClass(List);

export { ListSchema };
