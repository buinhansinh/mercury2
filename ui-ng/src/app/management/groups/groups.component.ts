import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { GroupService } from '../../db/group.service';
import { Observable, Subject } from 'rxjs';
import { Group } from '../../db/group.model';
import { MatDialog, PageEvent } from '@angular/material';
import { GroupFormComponent } from '../group-form/group-form.component';
import { take, takeUntil } from 'rxjs/operators';
import { PaginationDataSource } from '../../app-common/pagination-data-source';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private groupDataSource: PaginationDataSource<Group>;
  private pageSize: number;
  destroy$: Subject<any> = new Subject();
  displayedColumns = ['name'];
  constructor(private groupSerice: GroupService, private dialog: MatDialog) {}

  ngOnInit() {
    this.refreshData();
    this.subscribeToDataChanged();
  }

  private refreshData() {
    this.groupSerice
      .getGroupDataSource(this.pageSize)
      .pipe(take(1))
      .subscribe(groups => (this.groupDataSource = groups));
  }

  private subscribeToDataChanged() {
    this.groupSerice
      .getDataUpdateEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshData();
      });
  }

  onOpenAddGroupForm() {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      position: {
        top: '120px'
      },
      width: '400px'
    });
  }

  onDeleteGroup(group: any) {
    this.groupSerice.deleteGroup(group).subscribe();
  }

  onPageChange(pageEvent: PageEvent) {
    if (!this.groupDataSource) return;
    this.pageSize = pageEvent.pageSize;
    this.groupDataSource.setPageSize(pageEvent.pageSize);
    this.groupDataSource.setCurrentPage(pageEvent.pageIndex);
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }
}
