import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';
import { User } from 'src/users/schemas/user.schema';

export type ListSchema = HydratedDocument<List>;

@Schema()
export class List {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
  tasks: Task[];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

const ListSchema = SchemaFactory.createForClass(List);

const schemaFactory = (taskModel: Model<Task>) => {
  ListSchema.virtual('tasksCount').get(async function () {
    return await taskModel.countDocuments({ list: this._id }).exec();
  });
  return ListSchema;
};

export { ListSchema, schemaFactory };
