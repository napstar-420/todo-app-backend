import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { LoggerService } from 'src/logger/logger.service';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { OAuthService } from 'src/oauth/oauth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly loggerService: LoggerService,
    private readonly oAuthService: OAuthService,
  ) {}

  async googleAuth(code: string) {
    try {
      const tokenResponse = await this.oAuthService.getToken(code);
      const ticket = await this.oAuthService.verifyIdToken(
        tokenResponse.tokens.id_token,
      );
      const tokenPayload = ticket.getPayload();
      return this.googleSignIn(tokenPayload, tokenResponse);
    } catch (error) {
      this.loggerService.error(
        'Failed to obtain Google token',
        error,
        AuthService.name,
      );
      throw new UnauthorizedException('Failed to obtain Google token');
    }
  }

  async googleSignIn(
    tokenPayload: TokenPayload,
    tokenResponse: GetTokenResponse,
  ) {
    const { email, given_name, family_name, picture } = tokenPayload;
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expiry_date: expiryDate,
    } = tokenResponse.tokens;

    const user = {
      given_name,
      family_name,
      picture,
      email,
      id: '',
    };

    const isUserExists = await this.usersService.findByEmail(email);

    if (isUserExists) {
      await this.usersService.updateRefreshToken(isUserExists.id, refreshToken);
      user.id = isUserExists.id;
    } else {
      const createUserDto: CreateUserDto = {
        email,
        refreshToken,
      };

      const newUser = await this.usersService.create(createUserDto);
      user.id = newUser.id;
    }

    return {
      user,
      accessToken,
      refreshToken,
      expiryDate,
    };
  }
}
