import { Global, Module } from '@nestjs/common';
import { TokensService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../config';
import { OgmaModule } from '@ogma/nestjs-module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JwtConfig.AtSecret),
        signOptions: {
          expiresIn: config.get(JwtConfig.AtExpiration),
        },
      }),
    }),
    OgmaModule.forFeatures([TokensService]),
  ],
  providers: [TokensService],
})
export class SharedModule {}
