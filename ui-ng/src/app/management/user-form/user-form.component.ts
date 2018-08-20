import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../db/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      fullname: [null, Validators.required],
      passwordGroup: this.formBuilder.group({
        password: [null, Validators.required],
        passwordVerify: [null, Validators.required]
      }, { validator: this.passwordMatchValidator})
    });
  }

  private passwordMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get("password").value !==group.get("passwordVerify").value) {
        return { notMatching : true };
      }
    }
   
    return null;
  }

  onCreateUser(){
    const data = this.userForm.value;
    this.userService.create({
      name: data.username,
      display_name: data.fullname,
      password: data.passwordGroup.password
    }).subscribe(() => {console.log('success')});
  }
}
