import { Injectable } from '@angular/core';
import { User, Group } from './user.model';
import { USERS } from './user.mock-data';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

@Injectable()
export class UserService {

    private USERS: User[] = USERS;

    constructor() { }


    getById(id: string): Observable<User> {
        const results: User[] = this.USERS.filter(user => user.id === id);
        return of(results.length > 0 ? clone(results[0]) : null);
    }

    getByName(name: string): Observable<User> {
        const results: User[] = this.USERS.filter(user => user.name === name);
        console.log('name: ' + name + ' results: ' + results[0].name);
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
