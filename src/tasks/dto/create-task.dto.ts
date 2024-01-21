import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsMongoId,
  MaxLength,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64, {
    message: 'Title should be less than 65 characters',
  })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly description: string;

  @IsNotEmpty()
  @IsDateString()
  readonly dueDate: string;

  @IsOptional()
  @IsMongoId()
  readonly list?: string;

  @IsOptional()
  @IsArray()
  @MaxLength(6)
  readonly tags?: Set<string>;
}
