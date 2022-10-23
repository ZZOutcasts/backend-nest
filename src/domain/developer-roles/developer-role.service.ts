import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { DeveloperRoleRepository } from './developer-role.repository';
import { CreateDeveloperRoleDto, UpdateDeveloperRoleDto } from './dto';
import { DeveloperRole } from './developer-role.entity';
import { DeveloperRoleId, DeveloperRoleName } from './types';

@Injectable()
export class DeveloperRoleService {
  constructor(
    @OgmaLogger(DeveloperRoleService) private readonly logger: OgmaService,
    private readonly developerRoleRepository: DeveloperRoleRepository,
  ) {}

  public async createDeveloperRole(data: CreateDeveloperRoleDto) {
    const developerRole = this.developerRoleRepository.create(data);
    return await this.developerRoleRepository.persistAndFlush(developerRole);
  }

  public async updateDeveloperRole(
    id: number,
    data: UpdateDeveloperRoleDto,
  ): Promise<DeveloperRole> {
    const developerRole = await this.developerRoleRepository.findById(id);
    this.developerRoleRepository.assign(developerRole, data);
    await this.developerRoleRepository.persistAndFlush(developerRole);
    return developerRole;
  }

  public async getDeveloperRoleByName(name: DeveloperRoleName) {
    return this.developerRoleRepository.findByName(name);
  }

  public async getDeveloperRolesByNames(names: DeveloperRoleName[]) {
    return this.developerRoleRepository.find({ name: { $in: names } });
  }

  public async searchDeveloperRolesByName(name: string) {
    return this.developerRoleRepository.searchByName(name);
  }

  public async getDeveloperRoleById(id: DeveloperRoleId) {
    return this.developerRoleRepository.findById(id);
  }

  public async getDeveloperRolesByIds(ids: DeveloperRoleId[]) {
    return this.developerRoleRepository.find({ id: { $in: ids } });
  }

  public async deleteDeveloperRole(id: number) {
    return this.developerRoleRepository.nativeDelete({ id });
  }
}
