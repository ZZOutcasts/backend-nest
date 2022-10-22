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
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
} from '@domain/technologies/dto';
import { TechnologyService } from '@domain/technologies/technology.service';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Technology } from '@domain/technologies/technology.entity';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesApiController {
  constructor(
    @OgmaLogger(TechnologiesApiController) private readonly logger: OgmaService,
    private readonly technologyService: TechnologyService,
  ) {}

  @Get()
  public async getTechnologies(@Query('name') name: string) {
    return this.technologyService.searchTechnologiesByName(name);
  }

  @ApiOkResponse({ type: Technology })
  @Get('/:id')
  public async getTechnologyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Technology> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return await this.technologyService.updateTechnology(
      id,
      updateTechnologyDto,
    );
  }

  @Delete('/:id')
  public async deleteTechnology(@Param('id', ParseIntPipe) id: number) {
    return this.technologyService.deleteTechnology(id);
  }
}
