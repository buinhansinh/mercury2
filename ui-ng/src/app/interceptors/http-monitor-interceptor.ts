import { tap, timeout, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../db/authentication.service';
import { NotificationService } from '../db/notification.service';

@Injectable()
export class HttpMonitorInterceptor implements HttpInterceptor {
  private currentRequestNumber = 0;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.currentRequestNumber++;
    if (this.currentRequestNumber === 1) {
      this.notifService.notify('Loading...');
    }
    return next.handle(req).pipe(
      tap(
        () => {},
        error => {
          this.notifService.notifyError('There is an error occured');
        }
      ),
      finalize(() => {
        if (--this.currentRequestNumber === 0) {
          this.notifService.notify('');
        }
      })
    );
  }

  constructor(private notifService: NotificationService) {}
}
