import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../db/user.service';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';

export const  passwordMatchValidator = (group: FormGroup) =>  {
  if (group) {
    if (group.get("password").value !==group.get("passwordVerify").value) {
      return { notMatching : true };
    }
  }
  return null;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  private isProcessing = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private matDialogRef: MatDialogRef<UserFormComponent>) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      fullname: [null, Validators.required],
      passwordGroup: this.formBuilder.group({
        password: [null, Validators.required],
        passwordVerify: [null, Validators.required]
      }, { validator: passwordMatchValidator})
    });
  }


  onCreateUser(){
    if(this.isProcessing) return;
    this.isProcessing = true;
    const data = this.userForm.value;
    this.userService.create({
      name: data.username,
      display_name: data.fullname,
      password: data.passwordGroup.password
    }).pipe(finalize(() => this.isProcessing = false)).subscribe(() => { this.matDialogRef.close()});
  }
}
