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

  getTaskModel() {
    return this.taskModel;
  }

  async findAll() {
    return this.taskModel.find();
  }

  async findListTasks(listID: string) {
    if (!isMongoId(listID)) {
      throw new NotFoundException('Invalid mongo ID');
    }

    return this.taskModel.find({ list: listID });
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    await task.save();
    return task;
  }

  async update(id: string, updatedTaskDto: UpdateTaskDto) {
    return this.taskModel.findOneAndUpdate(
      { _id: id },
      {
        ...updatedTaskDto,
        updatedAt: new Date(),
        completedAt: updatedTaskDto.completed ? new Date() : null,
      },
    );
  }

  async removeOne(id: string) {
    return this.taskModel.deleteOne({ _id: id });
  }
}
