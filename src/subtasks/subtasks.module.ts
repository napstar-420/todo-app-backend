import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtask, SubtaskSchema } from './schemas/subtask.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subtask.name,
        schema: SubtaskSchema,
      },
    ]),
  ],
})
export class SubtasksModule {}
