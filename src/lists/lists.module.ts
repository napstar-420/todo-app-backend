import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { List, schemaFactory } from './schemas/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { Task } from 'src/tasks/schemas/task.schema';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forFeatureAsync([
      {
        imports: [TasksModule],
        name: List.name,
        useFactory: schemaFactory,
        inject: [getModelToken(Task.name)],
      },
    ]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
