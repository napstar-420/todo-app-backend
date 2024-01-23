import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { OAuthService } from 'src/oauth/oauth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly loggerService: LoggerService,
    private readonly oAuthService: OAuthService,
  ) {}

  async generateJwtToken(payload: JwtPayloadDto, options?: JwtSignOptions) {
    return this.jwtService.signAsync(payload, options);
  }

  async googleAuth(code: string) {
    try {
      const tokenResponse = await this.oAuthService.getToken(code);
      const ticket = await this.oAuthService.verifyIdToken(
        tokenResponse.tokens.id_token,
      );
      const tokenPayload = ticket.getPayload();
      return await this.googleSignIn(tokenPayload);
    } catch (error) {
      this.loggerService.error(
        'Failed to obtain Google token',
        error,
        AuthService.name,
      );
      throw new UnauthorizedException('Failed to obtain Google token');
    }
  }

  async googleSignIn(tokenPayload: TokenPayload) {
    const {
      email,
      given_name: firstName,
      family_name: lastName,
      picture: avatar,
    } = tokenPayload;

    const user = {
      email,
      firstName,
      lastName,
      avatar,
      id: '',
    };

    const isUserExists = await this.usersService.findByEmail(email);

    if (isUserExists) {
      user.id = isUserExists.id;
    } else {
      const newUser = await this.usersService.create(user);
      user.id = newUser.id;
    }

    const jwtPayload: JwtPayloadDto = {
      email: user.email,
      sub: user.id,
    };

    const accessToken = await this.generateJwtToken(jwtPayload, {
      expiresIn: '1d',
    });
    const refreshToken = await this.generateJwtToken(jwtPayload, {
      expiresIn: '30d',
    });

    await this.usersService.update(user.id, {
      email,
      refreshToken,
      avatar,
      firstName,
      lastName,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
