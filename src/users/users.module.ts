import { Global, Module } from '@nestjs/common';
import { AuthController, UsersController } from './controllers';
import { UsersService, AuthService } from './services';
import { OgmaModule } from '@ogma/nestjs-module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

@Global()
@Module({
  imports: [
    OgmaModule.forFeatures([
      AuthService,
      AuthController,
      UsersService,
      UsersController,
    ]),
    MikroOrmModule.forFeature([User, RefreshTokenEntity]),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController, UsersController],
})
export class UsersModule {}
