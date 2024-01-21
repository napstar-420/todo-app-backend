import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  transform(value: string): string {
    if (isMongoId(value) && String(new ObjectId(value)) === value) {
      return value;
    }

    throw new BadRequestException('Invalid ID');
  }
}
