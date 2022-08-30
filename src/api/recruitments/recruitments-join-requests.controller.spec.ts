import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentsJoinRequestsController } from './recruitments-join-requests.controller';

describe('RecruitmentsJoinRequestsController', () => {
  let controller: RecruitmentsJoinRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentsJoinRequestsController],
    }).compile();

    controller = module.get<RecruitmentsJoinRequestsController>(
      RecruitmentsJoinRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
