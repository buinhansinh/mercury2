import { Injectable } from '@angular/core';
import { User, Group } from './user.model';
import { USERS } from './user.mock-data';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}


@Injectable()
export class UserService {

    private USERS: User[] = USERS;

    constructor(private http: HttpClient) { }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`api/admin/user/${id}`);
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`api/admin/user/`);
    }

    put(user: User): Observable<User> {
        return this.http.put<User>(`api/admin/user/`, user);
    }

    delete(user: User): Observable<User> {
        return this.http.delete<User>(`api/admin/user/${user.id}`);
    }

    exists(name: string): Observable<boolean> {
        return this.http.get<boolean>(`api/admin/user/exists/${name}`);
    }
}


@Injectable()
export class MockUserService {

    private USERS: User[] = USERS;

    constructor() { }

    getById(id: string): Observable<User> {
        const results: User[] = this.USERS.filter(user => user.id === id);
        return of(results.length > 0 ? clone(results[0]) : null);
    }

    getByName(name: string): Observable<User> {
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
