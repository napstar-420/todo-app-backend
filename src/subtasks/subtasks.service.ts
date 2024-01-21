import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subtask } from './schemas/subtask.schema';
import { Model } from 'mongoose';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-task.dto';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectModel(Subtask.name) private subtaskModel: Model<Subtask>,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto) {
    return await new this.subtaskModel(createSubtaskDto).save();
  }

  async update(id: string, updateSubtaskDto: UpdateSubtaskDto) {
    await this.subtaskModel.updateOne({ _id: id }, { ...updateSubtaskDto });
    return this.subtaskModel.findById(id);
  }

  async remove(id: string) {
    return this.subtaskModel.deleteOne({ _id: id });
  }
}
