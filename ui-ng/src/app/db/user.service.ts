import { Injectable, Inject } from '@angular/core';
import { User, Group } from './user.model';
import { USERS } from './user.mock';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { clone } from '../app-common/util';
import { tap, map } from 'rxjs/operators';

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

  getById(id: string): Observable<User> {
    return this.http.get<User>(`api/security/user/${id}`);
  }

  getAll(): Observable<User[]> {
    return this.http.get(`api/security/user/`).pipe(map((res : any) => res.users));
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`api/security/user/`, user).pipe(tap(() =>  this.notifyChanges()));
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`api/security/user/${user.id}`).pipe(tap(() => this.notifyChanges()));
  }

  exists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`api/security/user/exists/${name}`);
  }

  private notifyChanges(){
    this.dataUpdateEvent.next(true);
  }

  public getDataUpdateEvent(): Observable<boolean>{
    return this.dataUpdateEvent;
  }
}

@Injectable()
export class UserService extends HttpUserService {
  
  constructor(http: HttpClient) {
    super(http);
  }

 
}
