import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('recruitments/:recruitmentId/joinRequests')
export class RecruitmentsJoinRequestsController {
  @Get()
  public async getJoinRequests() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getJoinRequest() {
    throw new NotImplementedException();
  }

  @Post()
  public async createJoinRequest() {
    throw new NotImplementedException();
  }

  @Patch('/:id')
  public async updateJoinRequest() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteJoinRequest() {
    throw new NotImplementedException();
  }
}
