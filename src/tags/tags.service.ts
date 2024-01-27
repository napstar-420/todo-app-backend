import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async findAll(user: string) {
    return this.tagModel.find({ user }).exec();
  }

  async create(createTagDto: CreateTagDto) {
    return new this.tagModel(createTagDto).save();
  }
}
