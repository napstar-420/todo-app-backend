import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubtaskSchema = HydratedDocument<Subtask>;

@Schema()
export class Subtask {
  @Prop({ required: true })
  title: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: false })
  completed: boolean;
}

const SubtaskSchema = SchemaFactory.createForClass(Subtask);

export { SubtaskSchema };
