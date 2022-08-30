import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { Ogma } from '@ogma/logger';

import { BaseExceptionFilter } from '@nestjs/core';
import { ConstraintViolationException } from '@mikro-orm/core';

@Catch()
export class AppExceptionsFilter<T> extends BaseExceptionFilter {
  private readonly logger = new Ogma({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'ALL',
    json: process.env.NODE_ENV === 'production',
    application: 'Nest',
    context: 'AppExceptionsFilter',
  });

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.debug(exception);

    if (exception instanceof ConstraintViolationException) {
      exception = new ConflictException();
    }
    super.catch(exception, host);
  }
}
