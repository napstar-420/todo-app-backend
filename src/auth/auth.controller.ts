import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/skip-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('google/login')
  async googleAuth(@Body('code') code: string, @Res() res) {
    const { user, accessToken, refreshToken, expiryDate } =
      await this.authService.googleAuth(code);

    res.cookie('refresh_token', refreshToken, {
      maxAge: expiryDate,
      sameSite: true,
      secure: true,
    });

    return { user, accessToken };
  }
}
