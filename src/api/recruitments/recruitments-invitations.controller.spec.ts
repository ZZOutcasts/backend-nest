import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentsInvitationsController } from './recruitments-invitations.controller';

describe('RecruitmentsInvitationsController', () => {
  let controller: RecruitmentsInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentsInvitationsController],
    }).compile();

    controller = module.get<RecruitmentsInvitationsController>(
      RecruitmentsInvitationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
