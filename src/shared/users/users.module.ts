import { Module } from '@nestjs/common';
import { AuthService, TokensService, UsersService } from './services';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../config';
import { OgmaModule } from '@ogma/nestjs-module';
import { RefreshTokenEntity, User } from './db';
import { UserLoggedInGuard } from './guards';
import { AdminGuard } from './guards/admin.guard';
import { HydrateAuthUserPipe } from './hydrate-auth-user.pipe';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, RefreshTokenEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JwtConfig.AtSecret),
        signOptions: {
          expiresIn: config.get(JwtConfig.AtExpiration),
        },
      }),
    }),
    OgmaModule.forFeatures([
      AuthService,
      UserLoggedInGuard,
      AdminGuard,
      TokensService,
      UsersService,
    ]),
  ],
  providers: [
    UsersService,
    AuthService,
    UserLoggedInGuard,
    AdminGuard,
    TokensService,
    HydrateAuthUserPipe,
  ],
  exports: [
    UsersService,
    AuthService,
    UserLoggedInGuard,
    AdminGuard,
    TokensService,
    OgmaModule,
    HydrateAuthUserPipe,
  ],
})
export class UsersModule {}
