import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Permission } from './permission.model';

@Injectable()
export class NotificationService {
  private notifications: Subject<string> = new Subject();
  private errors: Subject<string> = new Subject();

  public getNotifications(){
    return this.notifications;
  }

  public notify(message: string){
    this.notifications.next(message);
  }

  public notifyError(error: string){
    this.errors.next(error);
  }

  public getErrors(){
    return this.errors;
  }
}
