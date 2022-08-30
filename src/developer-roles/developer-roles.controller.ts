import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';

@Controller('roles')
export class DeveloperRolesController {
  @Get()
  public async getDeveloperRoles() {
    throw new NotImplementedException();
  }

  @Get('/:id')
  public async getDeveloperRole() {
    throw new NotImplementedException();
  }

  @Post('/:id')
  public async createDeveloperRole() {
    throw new NotImplementedException();
  }

  @Put('/:id')
  public async updateDeveloperRole() {
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async deleteDeveloperRole() {
    throw new NotImplementedException();
  }
}
