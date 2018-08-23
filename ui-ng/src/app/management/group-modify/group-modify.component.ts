import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Permission } from '../../db/permission.model';
import { PermissionService } from '../../db/permission.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
  allPermissions: Permission[];
  availablePermissions: Permission[];
  permissionsForGroup: Permission[];
  group: Group;
  dataNotChanged = true;
  permissionControl: FormControl;
  constructor(
    private formBuilder: FormBuilder,
    private permissionSerivce: PermissionService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGroupInformation();
    this.groupForm = this.formBuilder.group({
      groupName: [null, Validators.required]
    });
    this.permissionControl = new FormControl();
    this.permissionForm = this.formBuilder.group({
      permission: this.permissionControl
    });

    this.loadData();
    this.updateForm();
  }

  private loadData() {
    const data = this.route.snapshot.data.data;
    this.allPermissions = data.permissions;
    this.group = data.group;
    this.updatePermissionView(data.permissionsForGroup);
  }

  private updateForm() {
    this.groupForm.setValue({
      groupName: this.group.name
    });
    this.groupForm.valueChanges.subscribe(value => {
      this.dataNotChanged = value.groupName === this.group.name;
    });
    this.permissionControl.valueChanges.subscribe(permission => {
      if (permission) {
        this.groupService
          .addPermissionToGroup(this.group.id, permission.id)
          .subscribe(() => {
            this.permissionControl.reset();
            this.refreshPermissions();
          });
      }
    });
  }

  private updatePermissionView(permissionIds: number[]) {
    const ids = new Set(permissionIds);
    this.permissionsForGroup = this.allPermissions.filter(permission =>
      ids.has(permission.id)
    );
    this.availablePermissions = this.allPermissions.filter(
      permission => !ids.has(permission.id)
    );
  }

  private refreshPermissions() {
    this.groupService
      .getPermissionForGroup(this.group.id)
      .subscribe(permissions => this.updatePermissionView(permissions));
  }

  private loadGroupInformation() {
    this.groupService
      .getGroupById(this.route.snapshot.paramMap.get('id'))
      .subscribe((group: Group) => {
        this.dataNotChanged = true;
        this.group = group;
      });
  }

  onDeletePermission(permission: Permission) {
    this.groupService
      .removePermissionFromGroup(this.group.id, permission.id)
      .subscribe(() => {
        this.refreshPermissions();
      });
  }

  onUpdateGroup() {
    this.groupService
      .updateGroup({
        ...this.group,
        name: this.groupForm.value.groupName
      })
      .subscribe(() => {
        this.loadGroupInformation();
      });
  }

  onDeleteGroup() {
    this.groupService.deleteGroup(this.group).subscribe(() => {
      this.router.navigate(['../../groups'], { relativeTo: this.route });
    });
  }
}
