import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperRolesController } from './developer-roles.controller';

describe('DeveloperRolesController', () => {
  let controller: DeveloperRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperRolesController],
    }).compile();

    controller = module.get<DeveloperRolesController>(DeveloperRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
