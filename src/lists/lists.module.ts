import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schemas/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forFeature([
      {
        name: List.name,
        schema: ListSchema,
      },
    ]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
