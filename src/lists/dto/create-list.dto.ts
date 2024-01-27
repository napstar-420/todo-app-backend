import {
  IsArray,
  IsHexColor,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly name: string;

  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  readonly tasks: string[];
}
