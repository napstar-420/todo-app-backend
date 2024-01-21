import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

export type SubtaskSchema = HydratedDocument<Subtask>;

@Schema()
export class Subtask {
  @Prop({ required: true })
  title: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Task' })
  task: Task;
}

const SubtaskSchema = SchemaFactory.createForClass(Subtask);

export { SubtaskSchema };
