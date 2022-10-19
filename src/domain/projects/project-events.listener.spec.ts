import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEventsListener } from './project-events.listener';

describe('ProjectEventsListenerService', () => {
  let service: ProjectEventsListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectEventsListener],
    }).compile();

    service = module.get<ProjectEventsListener>(ProjectEventsListener);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
