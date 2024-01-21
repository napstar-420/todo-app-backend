import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateJwtToken(payload: JwtPayloadDto) {
    return this.jwtService.signAsync(payload);
  }

  async googleSignIn(user: CreateUserDto | undefined) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const isUserExists = await this.usersService.findByEmail(user.email);

    const jwtPayload = {
      sub: isUserExists?.id,
      email: isUserExists?.email,
    };

    if (!isUserExists) {
      const newUser = await this.usersService.create(user);
      jwtPayload.sub = newUser.id;
      jwtPayload.email = newUser.email;
    }

    return this.generateJwtToken(jwtPayload);
  }
}
