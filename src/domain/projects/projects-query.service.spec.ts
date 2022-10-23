import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsQueryService } from './projects-query.service';

describe.skip('ProjectsQueryService', () => {
  let service: ProjectsQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsQueryService],
    }).compile();

    service = module.get<ProjectsQueryService>(ProjectsQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
