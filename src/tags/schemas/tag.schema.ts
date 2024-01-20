import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagSchema = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop({ required: true })
  name: string;
}

const TagSchema = SchemaFactory.createForClass(Tag);

export { TagSchema };
