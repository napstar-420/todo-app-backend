import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
  tasks: Task[];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

const ListSchema = SchemaFactory.createForClass(List);

export { ListSchema };
