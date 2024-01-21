import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';
import { User } from 'src/users/schemas/user.schema';

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

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;
}

const SubtaskSchema = SchemaFactory.createForClass(Subtask);

export { SubtaskSchema };
