import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Group } from '../../db/group.model';
import { GroupService } from '../../db/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../db/user.model';
import { UserService } from '../../db/user.service';
import { passwordMatchValidator } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  allGroups: Group[];
  availableGroups: Group[];
  userGroups: Group[];
  user: User;
  groupColumns = ['name', 'toolbar'];
  @ViewChild('f')
  passwordNgForm: NgForm;
  dataNotChanged = true;
  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setUpForms();
    this.loadData();
  }

  loadData() {
    const data = this.route.snapshot.data.data;
    console.log(data);
    this.allGroups = data.allGroups;
    this.updateGroupsView(data.allGroups, data.userGroups);
    this.user = data.user;
    this.updateForm(this.user);
  }

  private updateGroupsView(allGroups: Group[], userGroups: any[]) {
    const groupIds = new Set<string>(userGroups.map(group => group.group_id));
    this.userGroups = this.allGroups.filter(group => groupIds.has(group.id));
    this.availableGroups = this.allGroups.filter(
      group => !groupIds.has(group.id)
    );
  }

  private updateForm(user: User) {
    this.userForm.get('username').setValue(user.name);
    this.userForm.get('fullname').setValue(user.display_name);
  }

  setUpForms() {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      fullname: [null, Validators.required]
    });
    this.passwordForm = this.formBuilder.group(
      {
        password: [null, Validators.required],
        passwordVerify: [null, Validators.required]
      },
      { validator: passwordMatchValidator }
    );
    this.userForm.valueChanges.subscribe(values => {
      this.dataNotChanged =
        values.username === this.user.name &&
        values.fullname === this.user.display_name;
    });
  }

  onUpdateUserInfo() {
    this.userService
      .updateUser({
        ...this.user,
        name: this.userForm.value.username,
        display_name: this.userForm.value.fullname
      })
      .subscribe(() => {
        this.userService.getUserById(this.user.id).subscribe(user => {
          this.user = user;
          this.dataNotChanged = true;
        });
      });
  }

  onUpdatePassword() {
    this.userService
      .updatePassword({
        ...this.user,
        password: this.passwordForm.value.password
      })
      .subscribe(() => {
        this.passwordNgForm.resetForm();
      });
  }

  onAddGroup(group: Group) {
    this.groupService.addUserToGroup(this.user.id, group.id).subscribe(() => {
      this.refreshGroups();
    });
  }

  onDeleteGroup(group: Group) {
    this.groupService
      .removeUserFromGroup(this.user.id, group.id)
      .subscribe(() => {
        this.refreshGroups();
      });
  }

  onDeleteUser() {
    this.userService.delete(this.user).subscribe(() => {
      this.router.navigate(['../../users'], { relativeTo: this.route });
    });
  }

  private refreshGroups() {
    this.userService.getGroupForUser(this.user.id).subscribe(groups => {
      this.updateGroupsView(this.allGroups, groups);
    });
  }
}
