import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './schemas/list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { isMongoId } from 'class-validator';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  async findAll(user: string) {
    if (!isMongoId(user)) {
      throw new NotFoundException();
    }

    return this.listModel.find({ user });
  }

  async findOne(id: string) {
    const list = await this.listModel
      .findById(id)
      .populate({
        path: 'task',
        select: 'title dueDate subtasksCount',
      })
      .exec();

    if (!list) {
      throw new NotFoundException();
    }

    return list;
  }

  async create(createListDto: CreateListDto, user: string) {
    return new this.listModel({ ...createListDto, user }).save();
  }

  async update(id: string, updateListDto: UpdateListDto) {
    await this.listModel.updateOne(updateListDto);
    return this.listModel.findById(id);
  }

  async remove(id: string) {
    return this.listModel.findByIdAndDelete(id);
  }
}
