import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { JwtAtPayload } from '../types';
import { User } from './db';
import { UsersService } from './services';

@Injectable()
export class HydrateAuthUserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  transform(value: JwtAtPayload, metadata: ArgumentMetadata): Promise<User> {
    return this.usersService.getUserById(value.sub);
  }
}
