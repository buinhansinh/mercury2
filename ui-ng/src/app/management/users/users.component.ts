import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../db/user.model';
import { UserService } from '../../db/user.service';
import { MatDialog, PageEvent } from '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';
import { takeUntil } from 'rxjs/operators';
import { PaginationDataSource } from '../../app-common/pagination-data-source';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  userDataSource: PaginationDataSource<User>;
  displayedColumns = ['name', 'display_name'];
  destroy$: Subject<any> = new Subject();
  keyword: string;

  pageSize = 10;
  constructor(private userSerice: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.updateUserList();
    this.userSerice
      .getDataUpdateEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateUserList();
      });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }

  private updateUserList() {
    this.userSerice
      .getAll(this.pageSize)
      .subscribe(dataSource => (this.userDataSource = dataSource));
  }

  onOpenAddUserForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      position: {
        top: '120px'
      },
      width: '400px'
    });
  }

  searchUser() {
    if (this.keyword) {
      this.userSerice
        .searchUser(this.keyword, this.pageSize)
        .subscribe(dataSource => {
          this.userDataSource = dataSource;
        });
    } else {
      this.updateUserList();
    }
  }

  onPageChange(pageEvent: PageEvent) {
    if (!this.userDataSource) return;
    this.pageSize = pageEvent.pageSize;
    this.userDataSource.setPageSize(pageEvent.pageSize);
    this.userDataSource.setCurrentPage(pageEvent.pageIndex);
  }
}
