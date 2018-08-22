import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission } from '../../db/permission.model';
import { PermissionService } from '../../db/permission.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../db/group.service';
import { Group } from '../../db/group.model';

@Component({
  selector: 'app-group-modify',
  templateUrl: './group-modify.component.html',
  styleUrls: ['./group-modify.component.css']
})
export class GroupModifyComponent implements OnInit {
  groupForm: FormGroup;
  permissionForm: FormGroup;
  permissions$: Observable<Permission[]>;
  permissionsForGroup: Permission[];
  constructor(
    private formBuilder: FormBuilder,
    private permissionSerivce: PermissionService,
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadGroupInformation();
    this.groupForm = this.formBuilder.group({
      groupName: [null, Validators.required]
    });
    this.permissionForm = this.formBuilder.group({});
    this.permissions$ = this.permissionSerivce.getPermissions();
    this.permissionSerivce
      .getPermissions()
      .subscribe((permissions: Permission[]) => {
        this.permissionsForGroup = permissions;
      });
  }

  private loadGroupInformation(){
    this.groupService.getGroupById(this.route.snapshot.paramMap.get('id')).subscribe((group: Group) => {
      console.log(group);
    });
  }
}
