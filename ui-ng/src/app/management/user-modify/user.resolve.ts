import { Injectable } from '@angular/core';

import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Observable , zip } from 'rxjs';
import { GroupService } from '../../db/group.service';
import { PermissionService } from '../../db/permission.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../db/user.service';



@Injectable()
export class UserResolver implements Resolve<Observable<any>> {
  constructor(private userService: UserService, private permissionService: PermissionService, private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot) : Observable<any> {
    const userId = route.paramMap.get('id');
    return zip( 
        this.userService.getUserById(userId),
        this.userService.getGroupForUser(userId),
        this.groupService.getGroups(),
         (user, userGroups, allGroups) => ({ user, userGroups, allGroups}));
  }
}