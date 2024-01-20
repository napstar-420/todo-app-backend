import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtask, SubtaskSchema } from './schemas/subtask.schema';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subtask.name,
        schema: SubtaskSchema,
      },
    ]),
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
