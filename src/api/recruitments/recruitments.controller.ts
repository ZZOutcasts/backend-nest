import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recruitments')
@Controller('recruitments')
export class RecruitmentsController {
  @Get()
  public async getRecruitments() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getRecruitment() {
    throw new NotImplementedException();
  }
}
