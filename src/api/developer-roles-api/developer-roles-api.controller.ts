import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeveloperRoleService } from '../../domain/developer-roles/developer-role.service';
import { CreateDeveloperRoleDto } from '../../domain/developer-roles/dto/create-developer-role.dto';
import { UpdateDeveloperRoleDto } from '../../domain/developer-roles/dto/update-developer-role.dto';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@Controller('roles')
export class DeveloperRolesApiController {
  constructor(
    @OgmaLogger(DeveloperRolesApiController)
    private readonly logger: OgmaService,
    private readonly developerRoleService: DeveloperRoleService,
  ) {}

  @Get()
  public async getDeveloperRoles(@Query('name') name: string) {
    return this.developerRoleService.searchDeveloperRolesByName(name);
  }

  @Get('/:id')
  public async getDeveloperRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.developerRoleService.getDeveloperRoleById(id);
  }

  @Post()
  public async createDeveloperRole(
    @Body() createDeveloperRoleDto: CreateDeveloperRoleDto,
  ) {
    return await this.developerRoleService.createDeveloperRole(
      createDeveloperRoleDto,
    );
  }

  @Put('/:id')
  public async updateDeveloperRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeveloperRoleDto: UpdateDeveloperRoleDto,
  ) {
    return await this.developerRoleService.updateDeveloperRole(
      id,
      updateDeveloperRoleDto,
    );
  }

  @Delete('/:id')
  public async deleteDeveloperRole(@Param('id', ParseIntPipe) id: number) {
    return this.developerRoleService.deleteDeveloperRole(id);
  }
}
