import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) : Observable<User>{
    return this.http.post('/api/login', {
      username: username,
      password: password
    }).pipe(tap((user : User) => {
      localStorage.setItem("userId",user.id);
    }));
  }

  public logout(){
    localStorage.clear();
  }
}
