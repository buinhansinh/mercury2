import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {
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
    this.http
      .get('/api/logout')
      .pipe(
        finalize(() => {
          localStorage.clear();
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  public isAuthenticated() {
    return !!localStorage.getItem('userId');
  }

  public clearSession() {
    localStorage.clear();
  }
}
