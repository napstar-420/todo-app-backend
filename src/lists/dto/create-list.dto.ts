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

  @IsOptional()
  @IsHexColor()
  readonly color: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  readonly tasks: string[];
}
