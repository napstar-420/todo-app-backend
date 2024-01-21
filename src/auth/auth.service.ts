import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserSchema } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateJwtToken(payload: JwtPayloadDto) {
    return this.jwtService.signAsync(payload);
  }

  async googleSignIn(createUserDto: CreateUserDto | undefined) {
    if (!createUserDto) {
      throw new UnauthorizedException();
    }

    let user: UserSchema;

    const isUserExists = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (!isUserExists) {
      const newUser = await this.usersService.create(createUserDto);
      user = newUser;
    } else {
      user = isUserExists;
    }

    const jwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.generateJwtToken(jwtPayload);
    return { token, user };
  }
}
