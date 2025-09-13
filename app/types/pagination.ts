export interface PaginationMeta<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface QueryRequest {
  limit?: number; // items per page
  offset?: number; // alternative to page
  search?: string; // search term
  sortBy?: string; // e.g., 'createdAt', 'name'
  sortOrder?: "asc" | "desc";
}
