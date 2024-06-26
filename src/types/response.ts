export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  results: T[];
}
