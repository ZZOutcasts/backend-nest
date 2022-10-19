import { PaginatedEntityInterface } from './paginated-entity.interface';

export class PaginatedResponseDto<T> implements PaginatedEntityInterface<T> {
  total: number;
  offset: number;
  isFinished: boolean;
  data: T[];
}
