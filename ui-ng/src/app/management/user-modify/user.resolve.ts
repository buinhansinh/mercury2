import { Injectable } from '@angular/core';

import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';

import { Observable, zip } from 'rxjs';
import { GroupService } from '../../db/group.service';
import { PermissionService } from '../../db/permission.service';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../db/user.service';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {
  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private groupService: GroupService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const userId = route.paramMap.get('id');
    return zip(
      this.userService.getUserById(userId),
      this.userService.getGroupForUser(userId),
      this.groupService.getGroups(),
      (user, userGroups, allGroups) => ({ user, userGroups, allGroups })
    ).pipe(tap(() => {}, error => this.router.navigate(['/management/users'])));
  }
}
