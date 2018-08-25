import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
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

export class SimpleDataSource<T> implements PaginationDataSource<T> {
  public readonly totalItems = new BehaviorSubject<number>(0);
  public readonly items: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  constructor(private pageSize = 10, private dataProvider: DataProvider<T>) {}

  setCurrentPage(pageIndex: number) {
    const offset = (pageIndex < 0 ? 0 : pageIndex) * this.pageSize;
    this.dataProvider(offset, this.pageSize)
      .pipe(take(1))
      .subscribe(result => {
        this.totalItems.next(result.total);
        this.items.next(result.items);
      });
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
}
