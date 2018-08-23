import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../db/notification.service';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-notification-displayer',
  templateUrl: './notification-displayer.component.html',
  styleUrls: ['./notification-displayer.component.css']
})
export class NotificationDisplayerComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();
  notification: string;
  error: string;
  errorClearer = new Subject<boolean>();

  constructor(private notifService: NotificationService) {}

  ngOnInit() {
    this.notifService
      .getNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.notification = message;
      });
    this.notifService
      .getErrors()
      .pipe(
        tap(() => {
          this.errorClearer.next(true);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(error => (this.error = error));
    this.errorClearer
      .pipe(
        debounceTime(5000),
        takeUntil(this.destroy$)
      )
      .subscribe(() => (this.error = ''));
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }
}
