import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class OAuthService {
  constructor(private readonly configService: ConfigService) {}

  private readonly clientID = this.configService.get('google.clientID');
  private readonly clientSecret = this.configService.get('google.clientSecret');

  private readonly oAuth2Client = new OAuth2Client(
    this.clientID,
    this.clientSecret,
    'postmessage',
  );

  async getToken(code: string) {
    return await this.oAuth2Client.getToken(code);
  }

  async getTokenInfo(token: string) {
    return await this.oAuth2Client.getTokenInfo(token);
  }

  async verifyIdToken(idToken: string) {
    return await this.oAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: this.clientID,
    });
  }
}
