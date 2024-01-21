import {
  IsHexColor,
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
}
