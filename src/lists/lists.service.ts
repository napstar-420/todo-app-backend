import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './schemas/list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { isMongoId } from 'class-validator';
import { TasksService } from 'src/tasks/tasks.service';
import { FindListDto } from './dto/find-list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private listModel: Model<List>,
    private readonly tasksService: TasksService,
  ) {}

  async findAll(user: string) {
    if (!isMongoId(user)) {
      throw new NotFoundException('Invalid user ID');
    }

    const lists = await this.listModel
      .find({ user })
      .select('-user -tasks')
      .exec();

    const todayTasksCount = await this.tasksService.findTodayTasksCount();
    const upcomingTasksCount =
      await this.tasksService.findUpcomingTasksLength();

    return { lists, todayTasksCount, upcomingTasksCount };
  }

  async findOneByID(id: string) {
    const list = await this.listModel
      .findById(id)
      .select('-user')
      .populate({
        path: 'tasks',
        select: '-user -subtasks -list',
      })
      .exec();

    if (!list) {
      throw new NotFoundException();
    }

    return list;
  }

  async findOne(filters: FindListDto) {
    return this.listModel.findOne(filters).exec();
  }

  async create(createListDto: CreateListDto, user: string) {
    const isListExists = await this.findOne({ name: createListDto.name });

    if (isListExists) {
      throw new ConflictException('List already exists');
    }

    return new this.listModel({ ...createListDto, user }).save();
  }

  async update(id: string, updateListDto: UpdateListDto) {
    await this.listModel.updateOne({ _id: id }, updateListDto).exec();
    return this.listModel.findById(id).select('name color tasksCount');
  }

  async remove(id: string) {
    return this.listModel.deleteOne({ _id: id });
  }
}
