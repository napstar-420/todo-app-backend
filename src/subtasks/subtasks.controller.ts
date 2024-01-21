import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-task.dto';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  create(@Body(ValidationPipe) createSubtaskDto: CreateSubtaskDto) {
    return this.subtasksService.create(createSubtaskDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSubtaskDto: UpdateSubtaskDto,
  ) {
    return this.subtasksService.update(id, updateSubtaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(id);
  }
}
