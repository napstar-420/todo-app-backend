import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './schemas/list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  async findOne(id: string) {
    return this.listModel.findById(id);
  }

  async create(createListDto: CreateListDto) {
    return new this.listModel(createListDto).save();
  }

  async update(id: string, updateListDto: UpdateListDto) {
    await this.listModel.updateOne(updateListDto);
    return this.listModel.findById(id);
  }

  async remove(id: string) {
    return this.listModel.findByIdAndDelete(id);
  }
}
