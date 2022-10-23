import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProjectsManagementService } from '@domain/projects/projects-management.service';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { TechnologyName } from '@domain/technologies/types';
import { DeveloperRoleName } from '@domain/developer-roles/types';
import {
  CreateProjectDto,
  CreateProjectHydratedDto,
  UpdateProjectCapacityDto,
  UpdateProjectStatusDto,
} from '@domain/projects/dto';
import { AuthUser } from '@shared/decorators';
import { User } from '@shared/users/db';
import { HydrateAuthUserPipe } from '@shared/users/hydrate-auth-user.pipe';
import { HydrateDeveloperRolesPipe } from '@domain/developer-roles/hydrate-developer-roles.pipe';
import { HydrateTechnologiesPipe } from '@domain/technologies/hydrate-technologies.pipe';
import { Project } from '@domain/projects/project.entity';
import { ApiPaginatedResponse, PaginatedResponseDto } from '@shared/types';
import { UserLoggedInGuard } from '@shared/users/guards';
import { ProjectsQueryService } from '@domain/projects/projects-query.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectManagementService: ProjectsManagementService,
    private readonly projectsQueryService: ProjectsQueryService,
    @OgmaLogger(ProjectsController) private readonly logger: OgmaService,
  ) {}

  @ApiPaginatedResponse(Project)
  @Get('/')
  public async getProjects(
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('techStack', new ParseArrayPipe({ items: String }))
    techStack: TechnologyName[],
    @Query('roles', new ParseArrayPipe({ items: String }))
    roles: DeveloperRoleName[],
    @Query('page', new DefaultValuePipe(20), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(0), ParseIntPipe) pageSize: number,
    @Query('deleted', new DefaultValuePipe(false), ParseBoolPipe)
    includeDeleted: boolean,
  ): Promise<PaginatedResponseDto<Project>> {
    this.logger.debug(
      `Query Params:: Name: ${name} TechStack: ${techStack}, Roles: ${roles}, Page: ${page}, PageSize: ${pageSize}, IncludeDeleted: ${includeDeleted}`,
    );
    return await this.projectsQueryService.getProjects({
      name,
      techStack,
      roles,
      page,
      pageSize,
      includeDeleted,
    });
  }

  @Get('/:id')
  public async getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Project> {
    const project = await this.projectsQueryService.getProjectById(id);
    this.projectsQueryService.dispatchProjectViewed(id);
    return project;
  }

  @ApiBody({ type: CreateProjectDto })
  @UseGuards(UserLoggedInGuard)
  @Post('')
  public async createProject(
    @Body(HydrateDeveloperRolesPipe, HydrateTechnologiesPipe)
    createProjectDto: CreateProjectHydratedDto,
    @AuthUser(HydrateAuthUserPipe) user: User,
  ): Promise<Project> {
    return await this.projectManagementService.createProject(
      createProjectDto,
      user,
    );
  }

  //TODO auth rules
  @UseGuards(UserLoggedInGuard)
  @Delete('/:id')
  public async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return await this.projectManagementService.softDeleteProject(id);
  }

  //TODO auth rules
  @UseGuards(UserLoggedInGuard)
  @Put('/:id/status')
  public async updateProjectStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    { status }: UpdateProjectStatusDto,
  ) {
    return await this.projectManagementService.updateProjectStatus(id, status);
  }

  //TODO auth rules
  @UseGuards(UserLoggedInGuard)
  @Put('/:id/capacity')
  public async updateProjectCapacity(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    { capacity }: UpdateProjectCapacityDto,
  ) {
    return await this.projectManagementService.updateProjectCapacity(
      id,
      capacity,
    );
  }
}
