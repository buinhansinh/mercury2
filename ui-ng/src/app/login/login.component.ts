import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../db/authentication.service';
import { take } from 'rxjs/operators';
import { User } from '../db/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData.username, loginData.password).subscribe(
        (user: User) => {
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.errorMessage = 'Invalid username or password!';
        }
      );
    }
  }
}
