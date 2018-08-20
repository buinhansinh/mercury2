import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
    console.log('only once');
  }

  public login(username: string, password: string): Observable<User> {
    return this.http
      .post('/api/login', {
        username: username,
        password: password
      })
      .pipe(
        tap((user: any) => {
          localStorage.setItem('userId', user.user.id);
        })
      );
  }

  public logout() {
    localStorage.clear();
  }

  public isAuthenticated() {
    return !!localStorage.getItem('userId');
  }
}
