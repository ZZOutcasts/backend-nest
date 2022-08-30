import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsRecruitmentsController } from './projects-recruitments.controller';

describe('ProjectsRecruitmentsController', () => {
  let controller: ProjectsRecruitmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsRecruitmentsController],
    }).compile();

    controller = module.get<ProjectsRecruitmentsController>(ProjectsRecruitmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
