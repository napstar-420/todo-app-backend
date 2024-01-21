import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;
}
