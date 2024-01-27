import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { ListsService } from './lists.service';
import { UpdateListDto } from './dto/update-list.dto';
import { ValidateMongoId } from 'src/pipes/validate-mongo-id.pipe';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll(@Req() { user }) {
    return this.listsService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.listsService.findOneByID(id);
  }

  @Post()
  create(@Req() { user }, @Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoId) id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.listsService.remove(id);
  }
}
