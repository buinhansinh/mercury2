import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Permission } from './permission.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PermissionService {
  constructor(private http: HttpClient) {}
  public getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>('api/security/permission');
  }
}
