import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User, Group, userBelongsTo } from './user.model';
import { Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public form: FormGroup;
  public user$: Observable<User>;
  public groups;
  public oldUsername: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  public userBelongsTo = userBelongsTo;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user$ = this.route.paramMap
      .switchMap((params: ParamMap, index: number) =>
        this.userService.getById(params.get('id')));
    this.user$.subscribe((user: User) => {
      this.oldUsername = user.name;
    });
    this.groups = [
      [Group.ADMIN, 'Admin'],
      [Group.SALES, 'Sales'],
      [Group.PURCHASING, 'Purchasing'],
      [Group.INVENTORY, 'Inventory'],
      [Group.ACCOUNTING, 'Accounting'],
      [Group.MANAGEMENT, 'Management'],
    ];
  }

}
