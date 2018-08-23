import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Output()
  public readonly onDelete = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog) {}

  onShowConfirm() {
    this.dialog
      .open(ConfirmDialogComponent, {
        position: {
          top: '200px'
        }
      })
      .afterClosed()
      .subscribe((confirm: string) => {
        if (confirm === 'confirm') {
          this.onDelete.emit(true);
        }
      });
  }
}
