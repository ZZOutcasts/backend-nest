import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller';
import { RecruitmentsInvitationsController } from './recruitments-invitations.controller';
import { RecruitmentsJoinRequestsController } from './recruitments-join-requests.controller';

@Module({
  controllers: [
    RecruitmentsController,
    RecruitmentsInvitationsController,
    RecruitmentsJoinRequestsController,
  ],
})
export class RecruitmentsModule {}
