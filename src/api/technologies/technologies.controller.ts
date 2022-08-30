import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';

@Controller('technologies')
export class TechnologiesController {
  @Get()
  public async getTechnologies() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getTechnology() {
    throw new NotImplementedException();
  }

  @Post()
  public async createTechnology() {
    throw new NotImplementedException();
  }

  @Put('/:id')
  public async updateTechnology() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteTechnology() {
    throw new NotImplementedException();
  }
}
