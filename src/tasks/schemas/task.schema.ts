import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { List } from 'src/lists/schemas/list.schema';
import { Subtask } from 'src/subtasks/schemas/subtask.schema';
import { Tag } from 'src/tags/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'list', default: null })
  list: List;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'tag' }], default: [] })
  tags: Tag[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subtask' }], default: [] })
  subTasks: Subtask[];

  @Prop({ default: new Date(), immutable: true })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Date, default: null })
  completedAt: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;
}

const TaskSchema = SchemaFactory.createForClass(Task);

const schemaFactory = (subtasksModel: Model<Subtask>) => {
  TaskSchema.virtual('subtasksCount').get(async function () {
    return await subtasksModel.countDocuments({ task: this._id }).exec();
  });
  return TaskSchema;
};

export { TaskSchema, schemaFactory };
