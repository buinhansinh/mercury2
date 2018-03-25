import { Injectable } from '@angular/core';
import { User, Group } from './user.model';
import { USERS } from './user.mock-data';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private USERS: User[] = USERS;

    constructor() { }

    getById(id: string): Observable<User> {
        const results: User[] = this.USERS.filter(user => user.id === id);
        return of(results.length > 0 ? results[0] : null);
    }

    getByName(name: string): User {
        const results: User[] = this.USERS.filter(user => user.name === name);
        return results.length > 0 ? results[0] : null;
    }

    getAll(): User[] {
        return this.USERS;
    }

    put(user: User) {
        this.USERS.push(user);
    }

    delete(user: User) {
        this.USERS = USERS.filter(u => u.id !== user.id);
    }
}
