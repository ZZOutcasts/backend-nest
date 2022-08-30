import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsMembersController } from './projects-members.controller';

describe('ProjectsMembersController', () => {
  let controller: ProjectsMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsMembersController],
    }).compile();

    controller = module.get<ProjectsMembersController>(
      ProjectsMembersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
