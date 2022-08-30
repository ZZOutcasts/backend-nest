import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Put,
} from '@nestjs/common';

@Controller('projects/:projectId/members')
export class ProjectsMembersController {
  @Get()
  public async getProjectMembers() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getProjectMember() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async removeProjectMember() {
    throw new NotImplementedException();
  }

  @Put('/:id/status')
  public async transferLeadership() {
    throw new NotImplementedException();
  }

  @Put('/:id/manager')
  public async grantManagerPermissions() {
    throw new NotImplementedException();
  }

  @Delete('/:id/manager')
  public async removeManagerPermissions() {
    throw new NotImplementedException();
  }
}
