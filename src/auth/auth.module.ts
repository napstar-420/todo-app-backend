import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { OAuthGuard } from './guards/jwt-auth.guard';
import { LoggerModule } from 'src/logger/logger.module';
import { OauthModule } from 'src/oauth/oauth.module';

@Module({
  imports: [UsersModule, LoggerModule, OauthModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: OAuthGuard,
    },
  ],
})
export class AuthModule {}
