import { Injectable } from '@angular/core';

import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, zip } from 'rxjs';
import { GroupService } from '../../db/group.service';
import { PermissionService } from '../../db/permission.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class GroupResolver implements Resolve<Observable<any>> {
  constructor(
    private groupService: GroupService,
    private permissionService: PermissionService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const groupId = route.paramMap.get('id');
    return zip(
      this.permissionService.getPermissions(),
      this.groupService.getGroupById(groupId),
      this.groupService.getPermissionForGroup(groupId),
      (permissions, group, permissionsForGroup) => ({
        permissions,
        group,
        permissionsForGroup
      })
    );
  }
}
