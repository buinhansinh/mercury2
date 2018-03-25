import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { User } from './user/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getAll();
  }

}
