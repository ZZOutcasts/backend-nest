import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsTechnologiesController } from './projects-technologies.controller';

describe('ProjectsTechnologiesController', () => {
  let controller: ProjectsTechnologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsTechnologiesController],
    }).compile();

    controller = module.get<ProjectsTechnologiesController>(ProjectsTechnologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
