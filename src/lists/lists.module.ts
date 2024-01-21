import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { List, ListSchema } from './schemas/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { Task, TaskSchema } from 'src/tasks/schemas/task.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: List.name,
        useFactory: (taskModel: Model<Task>) => {
          const schema = ListSchema;
          schema.pre('deleteOne', { document: true }, async function (next) {
            const tasks = this.tasks || [];

            taskModel.deleteMany({ list: { $in: tasks } });
            next();
          });

          return schema;
        },
        imports: [
          MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        ],
        inject: [getModelToken(Task.name)],
      },
    ]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
