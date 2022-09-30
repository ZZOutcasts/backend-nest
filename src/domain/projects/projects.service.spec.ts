import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { createMock } from '@golevelup/ts-jest';
import { ProjectRepository } from './project.repository';
import { ProjectMemberRepository } from './project-member.repository';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { User } from '../../shared/users/db';
import { v4 as uuid } from 'uuid';
import { AuthRole } from '../../shared/users/types/auth-role.enum';
import { CreateProjectDto } from './dto';

function createTestUser(username: string, authRole: AuthRole): User {
  const user: User = new User();
  user.id = uuid();
  user.username = username;
  user.email = `${username}@example.com`;
  user.authRole = authRole;
  return user;
}

describe('ProjectsService', () => {
  let service: ProjectsService;
  let module: TestingModule;
  let projectsRepository: ProjectRepository;
  let projectMemberRepository: ProjectMemberRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(ProjectRepository),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(ProjectMemberRepository),
          useValue: jest.fn(),
        },
      ],
    })
      .useMocker(() => createMock())
      .compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectsRepository = module.get<ProjectRepository>(ProjectRepository);
    projectMemberRepository = module.get<ProjectMemberRepository>(
      ProjectMemberRepository,
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO I've written an outline of test cases, but this method is probably best tested with an integration test
  describe('createProject', () => {
    const mockUserOwner = createTestUser('userOwner', AuthRole.User);
    describe('When an user creates a new project with no members', () => {
      const createProjectDto: CreateProjectDto = {
        name: 'test',
        description: 'test_description',
        capacity: 5,
        techStack: [],
        roles: [],
      };
      describe('And with existing roles', () => {
        describe('And with existing technologies', () => {
          it('Then the user is set as project leader', () => {});
          it('Then the user is set as project manager', () => {});
          it('Then supplied roles are set', () => {});
          it('Then supplied technologies are set', () => {});
          it('Then the capacity is set', () => {});
        });
        describe(`And at least one technology doesn't exist`, () => {
          it('Then missing technologies are not set', () => {});
        });
        describe('And none of the technologies exist', () => {
          it('Then no technologies are set', () => {});
        });
      });
      describe(`And at least one role doesn't exist`, () => {
        describe('And with existing technologies', () => {
          it('Then the missing roles are not set', () => {});
          it('Then all the technologies are set', () => {});
        });
        describe(`And at least technology doesn't exist`, () => {
          it('Then missing technologies are not set', () => {});
        });
        describe('And none of the technologies exist', () => {
          it('Then no technologies are set', () => {});
        });
      });
      describe('And none of the roles exist', () => {
        describe('And with existing technologies', () => {
          it('Then no roles are set', () => {});
          it('Then all the technologies are set', () => {});
        });
        describe(`And at least technology doesn't exist`, () => {
          it('Then missing technologies are not set', () => {});
        });
        describe('And none of the technologies exist', () => {
          it('Then no technologies are set', () => {});
        });
      });
    });
    // TODO feature not implemented now
    describe('When an user creates a new project with members', () => {
      describe('And there are no roles set on members', () => {
        describe('And there are no technologies set on members', () => {});
      });
      // different permutations of: existing roles/techs, at least one non-existing role/techs,
    });
  });
});
