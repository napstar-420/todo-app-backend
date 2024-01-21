import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSubtaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly title: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly task: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description: string;

  @IsOptional()
  @IsBoolean()
  readonly completed: boolean;
}
