import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Project Recruitments')
@Controller('projects/:projectId/recruitments')
export class ProjectsRecruitmentsController {
  @Get()
  public async getRecruitments() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getRecruitment() {
    throw new NotImplementedException();
  }

  @Post()
  public async openRecruitment() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async closeRecruitment() {
    throw new NotImplementedException();
  }

  @Get('/:recruitmentId/invitations')
  public async getInvitations() {
    throw new NotImplementedException();
  }

  @Get('/:recruitmentId/invitations/:id')
  public async getInvitation() {
    throw new NotImplementedException();
  }

  @Post('/:recruitmentId/invitations')
  public async createInvitation() {
    throw new NotImplementedException();
  }

  @Delete('/:recruitmentId/invitations/:id')
  public deleteInvitation() {
    throw new NotImplementedException();
  }

  @Get('/:recruitmentId/joinRequest')
  public async getJoinRequests() {
    throw new NotImplementedException();
  }

  @Get('/:recruitmentId/joinRequest/:id')
  public async getJoinRequest() {
    throw new NotImplementedException();
  }

  @Put('/:recruitmentId/joinRequest')
  public async acceptJoinRequest() {
    throw new NotImplementedException();
  }

  @Delete('/:recruitmentId/joinRequest/:id')
  public deleteJoinRequest() {
    throw new NotImplementedException();
  }
}
