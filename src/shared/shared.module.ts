import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../config';
import { OgmaModule } from '@ogma/nestjs-module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [AuthModule, UsersModule],
  exports: [UsersModule, AuthModule],
})
export class SharedModule {}
