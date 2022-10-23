export interface PaginatedEntityInterface<T> {
  total: number;
  offset: number;
  isFinished: boolean;
  data: T[];
}
