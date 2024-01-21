import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { LoggerService } from 'src/logger/logger.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { isMongoId } from 'class-validator';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly loggerService: LoggerService,
  ) {}

  async findListTasks(listID: string) {
    if (!isMongoId(listID)) {
      throw new NotFoundException('Invalid mongo ID');
    }

    return this.taskModel.find({ list: listID });
  }

  async findOne(id: string) {
    if (!isMongoId(id)) {
      throw new NotFoundException('Invalid mongo ID');
    }

    return this.taskModel
      .findById(id)
      .select('title description dueDate list subtasks tags completed')
      .populate({
        path: 'list',
        select: 'title',
      })
      .populate({
        path: 'subtasks',
        select: 'title description completed',
      })
      .populate({
        path: 'tags',
        select: 'name',
      })
      .exec();
  }

  async create(createTaskDto: CreateTaskDto) {
    return new this.taskModel(createTaskDto).save();
  }

  async update(id: string, updatedTaskDto: UpdateTaskDto) {
    await this.taskModel
      .findOneAndUpdate(
        { _id: id },
        {
          ...updatedTaskDto,
          updatedAt: new Date(),
          completedAt: updatedTaskDto.completed ? new Date() : null,
        },
      )
      .exec();

    return this.findOne(id);
  }

  async removeOne(id: string) {
    return this.taskModel.deleteOne({ _id: id });
  }
}
