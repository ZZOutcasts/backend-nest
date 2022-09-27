import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  @Get('/')
  public async getProjects() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getProjectById() {
    throw new NotImplementedException();
  }

  @Post('')
  public async createProject() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteProject() {
    throw new NotImplementedException();
  }

  @Put('/:id/status')
  public async updateProjectStatus() {
    throw new NotImplementedException();
  }

  @Put('/:id/capacity')
  public async updateProjectCapacity() {
    throw new NotImplementedException();
  }
}
