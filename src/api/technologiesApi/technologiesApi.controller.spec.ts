import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesApiController } from './technologiesApi.controller';

describe('TechnologiesController', () => {
  let controller: TechnologiesApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologiesApiController],
    }).compile();

    controller = module.get<TechnologiesApiController>(TechnologiesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
