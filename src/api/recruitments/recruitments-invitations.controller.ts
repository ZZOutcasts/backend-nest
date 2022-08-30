import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Put,
} from '@nestjs/common';

@Controller('recruitments/:recruitmentId/invitations')
export class RecruitmentsInvitationsController {
  @Get()
  public async getInvitations() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getInvitation() {
    throw new NotImplementedException();
  }

  @Put('/:id')
  public async acceptInvitation() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteInvitation() {
    throw new NotImplementedException();
  }
}
