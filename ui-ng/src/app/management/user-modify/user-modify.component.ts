import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Group } from '../../db/group.model';
import { GroupService } from '../../db/group.service';
import { ActivatedRoute } from '@angular/router';
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
  userGroups: Group[];
  user: User;
  groupColumns = ['name', 'toolbar'];
  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.setUpForms();
    this.loadData();
    
  }

  loadData(){
    const data = this.route.snapshot.data.data;
    this.allGroups = data.allGroups;
    this.userGroups = this.getDetails(data.allGroups,data.userGroups);
    this.user = data.user;
    this.updateForm(this.user);
  }

  private getDetails(allGroups: Group[], userGroups: any[]): Group[]{
    const groupIds = new Set<string>(userGroups.map(group => group.group_id));
    return this.allGroups.filter(group => groupIds.has(group.id));
  }

  private updateForm(user: User){
    this.userForm.get('username').setValue(user.name);
    this.userForm.get('fullname').setValue(user.display_name);
  }

  setUpForms(){
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      fullname: [null, Validators.required]
    });
    this.passwordForm = this.formBuilder.group({
      password: [null, Validators.required],
      passwordVerify: [null, Validators.required]
    }, { validator: passwordMatchValidator});
  }

  onUpdateUserInfo(){
    this.userService.updateUser({
      ...this.user,
      name: this.userForm.value.username,
      display_name: this.userForm.value.fullname
    }).subscribe();
  }

  onUpdatePassword(){
    this.userService.updatePassword({
      ...this.user,
      name: this.userForm.value.username,
      display_name: this.userForm.value.fullname
    }).subscribe();
  }

  onAddGroup(group: Group){
    this.groupService.addUserToGroup(this.user.id,group.id).subscribe(() => {
      this.refreshGroups();
    });
  }

  private refreshGroups(){
    this.userService.getGroupForUser(this.user.id).subscribe(groups => this.userGroups = groups);
  }
}
