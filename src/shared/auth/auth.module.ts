import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { UserLoggedInGuard } from './user-logged-in.guard';
import { OgmaModule } from '@ogma/nestjs-module';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JwtConfig.AtSecret),
        signOptions: {
          expiresIn: config.get(JwtConfig.AtExpiration),
        },
      }),
    }),
    OgmaModule.forFeatures([AuthService, UserLoggedInGuard, TokensService]),
  ],
  providers: [AuthService, UserLoggedInGuard, TokensService],
  exports: [AuthService, UserLoggedInGuard],
})
export class AuthModule {}
