import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTechnologyDto } from '../../domain/technologies/dto/create-technology.dto';
import { TechnologyService } from '../../domain/technologies/technology.service';
import { UpdateTechnologyDto } from '../../domain/technologies/dto/update-technology.dto';

@Controller('technologies')
export class TechnologiesApiController {
  constructor(private technologyService: TechnologyService) {}

  @Get()
  public async getTechnologies(@Query('searchQuery') searchQuery: string) {
    return this.technologyService.searchTechnologiesByName(searchQuery);
  }

  @Get('/name/:name')
  public async getTechnologyByName(@Param('name') name: string) {
    return this.technologyService.getTechnologyByName(name);
  }

  @Get('/:id')
  public async getTechnologyById(@Param('id') id: number) {
    return this.technologyService.getTechnologyById(id);
  }

  @Post()
  public async createTechnology(
    @Body() createTechnologyDto: CreateTechnologyDto,
  ) {
    return await this.technologyService.createTechnology(createTechnologyDto);
  }

  @Put('/:id')
  public async updateTechnology(
    @Param('id') id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return await this.technologyService.updateTechnology(
      id,
      updateTechnologyDto,
    );
  }

  @Delete('/:id')
  public async deleteTechnology(@Param('id') id: number) {
    return this.technologyService.deleteTechnology(id);
  }
}
