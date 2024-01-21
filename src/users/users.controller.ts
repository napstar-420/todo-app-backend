import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@Req() req) {
    const user = req.user as JwtPayloadDto;
    return this.usersService.findOne(user.sub);
  }
}
