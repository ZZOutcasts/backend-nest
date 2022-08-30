import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsSprintsController } from './projects-sprints.controller';

describe('ProjectsSprintsController', () => {
  let controller: ProjectsSprintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsSprintsController],
    }).compile();

    controller = module.get<ProjectsSprintsController>(
      ProjectsSprintsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
