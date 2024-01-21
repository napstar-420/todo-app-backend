import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  readonly name: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly task: string;
}
