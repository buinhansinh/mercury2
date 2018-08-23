import { Observable } from 'rxjs';
export interface Result<T> {
  items: T[];
  total: number;
}

export interface DataProvider<T> {
  (offset: number, limit: number): Observable<Result<T>>;
}
export interface PaginationDataSource<T> {
  items: Observable<T[]>;
  totalItems: Observable<number>;
  setPageSize(pageSize: number);
  setCurrentPage(pageIndex: number);
}
