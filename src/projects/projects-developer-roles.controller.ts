import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
} from '@nestjs/common';

@Controller('projects/:projectId/roles')
export class ProjectsDeveloperRolesController {
  @Get()
  public async getProjectRoles() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getProjectRole() {
    throw new NotImplementedException();
  }

  @Post()
  public async addProjectRole() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteProjectRole() {
    throw new NotImplementedException();
  }
}
