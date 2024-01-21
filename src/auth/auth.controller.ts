import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Public } from 'src/decorators/skip-auth';

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
    const user = req?.user;
    const token = await this.authService.googleSignIn(user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: true,
    });

    return res.sendStatus(HttpStatus.OK);
  }
}
