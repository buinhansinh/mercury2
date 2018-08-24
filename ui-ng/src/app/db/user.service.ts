import { Injectable, Inject } from '@angular/core';
import { User, Group } from './user.model';
import { USERS } from './user.mock';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { clone } from '../app-common/util';
import { tap, map, take } from 'rxjs/operators';
import { Permission } from './permission.model';
import {
  PaginationDataSource,
  DataProvider,
  Result
} from '../app-common/pagination-data-source';

export class UserDataSource implements PaginationDataSource<User> {
  public readonly totalItems = new BehaviorSubject<number>(0);
  public readonly items: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  constructor(
    private userService: UserService,
    private pageSize = 10,
    private dataProvider: DataProvider<User>
  ) {}

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

export class MockUserService {
  private USERS: User[] = USERS;

  constructor() {}

  getById(id: string): Observable<User> {
    const results: User[] = this.USERS.filter(user => user.id === id);
    return of(results.length > 0 ? clone(results[0]) : null);
  }

  exists(name: string): Observable<User> {
    const results: User[] = this.USERS.filter(user => user.name === name);
    return of(results.length > 0 ? clone(results[0]) : null);
  }

  getAll(): Observable<User[]> {
    return of(clone(this.USERS));
  }

  put(user: User): void {
    this.USERS.push(user);
  }

  delete(user: User): void {
    this.USERS = this.USERS.filter(u => u.id !== user.id);
  }
}

export class HttpUserService {
  private dataUpdateEvent: Subject<boolean> = new Subject();
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`api/security/user/${id}`);
  }

  getPermssionForUser(id: string): Observable<any> {
    return this.http.get<any>(`api/security/user/${id}/permission`);
  }

  getGroupForUser(id: string): Observable<any> {
    return this.http.get<any>(`api/security/user/${id}/group`);
  }
  getAll(pageSize: number): Observable<UserDataSource> {
    const dataSource = new UserDataSource(this, pageSize, (offset, limit) => {
      return this.http
        .get<Result<User>>(`api/security/user/`, {
          params: new HttpParams()
            .set('offset', offset + '')
            .set('limit', limit + '')
        })
        .pipe(
          map((res: any) => {
            return {
              total: res.total || 0,
              items: res.users
            };
          })
        );
    });
    dataSource.setCurrentPage(0);
    return of(dataSource);
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(`api/security/user/`, user)
      .pipe(tap(() => this.notifyChanges()));
  }

  delete(user: User): Observable<User> {
    return this.http
      .delete<User>(`api/security/user/${user.id}`)
      .pipe(tap(() => this.notifyChanges()));
  }

  exists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`api/security/user/exists/${name}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`api/security/user/${user.id}`, user);
  }

  updatePassword(user: User): Observable<any> {
    return this.http.put(`api/security/user/${user.id}/password`, user);
  }

  searchUser(keyword: string, pageSize: number): Observable<any> {
    const dataSource = new UserDataSource(
      this,
      pageSize,
      (offset, limit) => {
        return this.http
          .get(`api/security/user/search/${keyword}`, {
            params: new HttpParams()
              .set('offset', offset + '')
              .set('limit', limit + '')
          })
          .pipe(
            map((res: any) => {
              return {
                total: res.total || 0,
                items: res.users
              };
            })
          );
      }
    );
    dataSource.setCurrentPage(0);
    return of(dataSource);
  }

  private notifyChanges() {
    this.dataUpdateEvent.next(true);
  }

  public getDataUpdateEvent(): Observable<boolean> {
    return this.dataUpdateEvent;
  }
}

@Injectable()
export class UserService extends HttpUserService {
  constructor(http: HttpClient) {
    super(http);
  }
}
