import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Task, schemaFactory } from './schemas/task.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { LoggerModule } from 'src/logger/logger.module';
import { SubtasksModule } from 'src/subtasks/subtasks.module';
import { Subtask } from 'src/subtasks/schemas/subtask.schema';

@Module({
  imports: [
    SubtasksModule,
    MongooseModule.forFeatureAsync([
      {
        imports: [SubtasksModule],
        name: Task.name,
        useFactory: schemaFactory,
        inject: [getModelToken(Subtask.name)],
      },
    ]),
    LoggerModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService, MongooseModule],
})
export class TasksModule {}
