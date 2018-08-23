import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { GroupService } from '../../db/group.service';
import { Observable, Subject } from 'rxjs';
import { Group } from '../../db/group.model';
import { MatDialog } from '@angular/material';
import { GroupFormComponent } from '../group-form/group-form.component';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  destroy$: Subject<any> = new Subject();
  groups: Group[];
  displayedColumns = ['name', 'toolbox'];
  constructor(private groupSerice: GroupService, private dialog: MatDialog) {}

  ngOnInit() {
    this.refreshData();
    this.subscribeToDataChanged();
  }

  private refreshData() {
    this.groupSerice
      .getGroups()
      .pipe(take(1))
      .subscribe(groups => (this.groups = groups));
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

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }
}
