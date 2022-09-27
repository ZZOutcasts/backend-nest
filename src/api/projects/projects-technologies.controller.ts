import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Project Technologies')
@Controller('projects/:projectId/technologies')
export class ProjectsTechnologiesController {
  @Get()
  public async getTechnologies() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getTechnology() {
    throw new NotImplementedException();
  }

  @Post('')
  public async addTechnology() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async removeTechnology() {
    throw new NotImplementedException();
  }
}
