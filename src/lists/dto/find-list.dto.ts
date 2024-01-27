import { PartialType } from '@nestjs/mapped-types';
import { List } from '../schemas/list.schema';

export class FindListDto extends PartialType(List) {}
