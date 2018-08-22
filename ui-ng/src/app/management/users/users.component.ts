import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../db/user.model';
import { UserService } from '../../db/user.service';
import { MatDialog } from '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  displayedColumns = ['name', 'display_name'];
  destroy$: Subject<any> = new Subject();
  constructor(private userSerice: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.updateUserList();
    this.userSerice.getDataUpdateEvent().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateUserList();
    });
  }

  ngOnDestroy(){
    this.destroy$.next("");
    this.destroy$.unsubscribe();
  }

  private updateUserList(){
    this.users$ = this.userSerice.getAll();
  }

  onOpenAddUserForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      position: {
        top: '120px'
      },
      width: '400px'
    });
  }

  onDeleteUser(user: User){
    this.userSerice.delete(user).subscribe();
  }
}
