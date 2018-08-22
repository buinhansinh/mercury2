import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../db/group.service';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  private isProcessing = false;
  groupForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private matDialog: MatDialogRef<GroupFormComponent>) {}

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      groupName: [null, Validators.required]
    });
  }

  onCreateGroup() {
    if(this.groupForm.invalid || this.isProcessing) return;
    this.isProcessing = true;
    this.groupService.createGroup( {
      name: this.groupForm.value.groupName
    }).pipe(finalize(() => {
      this.isProcessing = false;
    })).subscribe(() => this.matDialog.close());

  }
}
