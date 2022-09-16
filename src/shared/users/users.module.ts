import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, RefreshTokenEntity])],
  providers: [UsersService, RefreshTokenService],
  exports: [UsersService, RefreshTokenService],
})
export class UsersModule {}
