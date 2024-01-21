import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Public } from 'src/decorators/skip-auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  googleAuth() {
    return 'google auth';
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallback(@Req() req, @Res() res: Response) {
    const createUserDto: CreateUserDto | undefined = req?.user;
    const { token, user } = await this.authService.googleSignIn(createUserDto);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: true,
    });

    return user;
  }
}
