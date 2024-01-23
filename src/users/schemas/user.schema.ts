import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { List } from 'src/lists/schemas/list.schema';
import { Task } from 'src/tasks/schemas/task.schema';

export type UserSchema = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'List' }], default: [] })
  lists: List[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
  tasks: Task[];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ required: true })
  refreshToken: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
