import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';
import { User } from 'src/users/schemas/user.schema';

export type TagSchema = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Task' })
  task: Task;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;
}

const TagSchema = SchemaFactory.createForClass(Tag);

export { TagSchema };
