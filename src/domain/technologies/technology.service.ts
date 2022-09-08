import { Injectable } from '@nestjs/common';
import { TechnologyRepository } from './technology.repository';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Technology } from './technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Injectable()
export class TechnologyService {
  constructor(
    @OgmaLogger(TechnologyService) private readonly logger: OgmaService,
    private readonly technologyRepository: TechnologyRepository,
  ) {}

  public async createTechnology(data: CreateTechnologyDto) {
    const technology = this.technologyRepository.create(data);
    return await this.technologyRepository.persistAndFlush(technology);
  }

  public async updateTechnology(
    id: number,
    data: UpdateTechnologyDto,
  ): Promise<Technology> {
    const technology = await this.technologyRepository.findById(id);
    this.technologyRepository.assign(technology, data);
    await this.technologyRepository.persistAndFlush(technology);
    return technology;
  }

  public async getTechnologyByName(name: string) {
    return this.technologyRepository.findByName(name);
  }

  public async searchTechnologiesByName(name: string) {
    return this.technologyRepository.searchByName(name);
  }

  public async getTechnologyById(id: number) {
    return this.technologyRepository.findById(id);
  }

  public async deleteTechnology(id: number) {
    return this.technologyRepository.nativeDelete({ id });
  }
}
