import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyId, TechnologyName, TechnologyRaw } from './types';

interface ITechnologies {
  techStack: TechnologyRaw[];
}

@Injectable()
export class HydrateTechnologiesPipe implements PipeTransform {
  constructor(private readonly technologiesService: TechnologyService) {}
  async transform(data: ITechnologies, metadata: ArgumentMetadata) {
    const techsIds = data.techStack.filter((entry) =>
      Number.isInteger(entry),
    ) as TechnologyId[];
    const techsNames = data.techStack.filter(
      (entry) => typeof entry === 'string',
    ) as TechnologyName[];

    const techsByIdsPromise =
      this.technologiesService.getTechnologiesByIds(techsIds);
    const techsByNamesPromise =
      this.technologiesService.getTechnologiesByNames(techsNames);

    const mappedTechs = await Promise.all([
      techsByIdsPromise,
      techsByNamesPromise,
    ]);

    const techsNoDuplicates = Array.from(new Set([...mappedTechs]));

    return {
      ...data,
      techStack: techsNoDuplicates,
    };
  }
}
