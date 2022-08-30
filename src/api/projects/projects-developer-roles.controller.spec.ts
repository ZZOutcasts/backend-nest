import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsDeveloperRolesController } from './projects-developer-roles.controller';

describe('ProjectsDeveloperRolesController', () => {
  let controller: ProjectsDeveloperRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsDeveloperRolesController],
    }).compile();

    controller = module.get<ProjectsDeveloperRolesController>(
      ProjectsDeveloperRolesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
