import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { List, ListSchema } from './schemas/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { Model } from 'mongoose';
import { Task } from 'src/tasks/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: List.name,
        useFactory: (taskModel: Model<Task>) => {
          const schema = ListSchema;

          schema.pre('deleteOne', { document: true }, async function (next) {
            taskModel.deleteMany({ list: this.id });
            next();
          });

          return schema;
        },
        inject: [getModelToken('Task')],
      },
    ]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
