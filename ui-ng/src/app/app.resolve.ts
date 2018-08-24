import { Injectable } from '@angular/core';

import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './db/user.service';
import { PermissionService } from './db/permission.service';

@Injectable()
export class PermissionResolver implements Resolve<Observable<any>> {
  constructor(private permissionService: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.permissionService.getPermissionsForCurrentUser();
  }
}
