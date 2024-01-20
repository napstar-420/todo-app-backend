import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subtask } from './schemas/subtask.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectModel(Subtask.name) private subtaskModel: Model<Subtask>,
  ) {}
}
