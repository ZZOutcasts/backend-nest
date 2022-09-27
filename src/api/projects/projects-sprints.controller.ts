import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Project Sprints')
@Controller('projects/:projectId/sprints')
export class ProjectsSprintsController {
  @Get('')
  public async getSprints() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getSprint() {
    throw new NotImplementedException();
  }

  @Post('')
  public async startSprint() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteSprint() {
    throw new NotImplementedException();
  }
}
