import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Req,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/skip-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('google/login')
  async googleAuth(
    @Body('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.googleAuth(code);

    res.cookie('refresh_token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });

    return { user, accessToken };
  }

  @Public()
  @Get('google/refresh')
  async googleRefresh(@Req() req: Request) {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) {
      throw new UnauthorizedException();
    }

    const { refresh_token } = cookies;

    try {
      const accessToken =
        await this.authService.verifyRefreshToken(refresh_token);
      return accessToken;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
