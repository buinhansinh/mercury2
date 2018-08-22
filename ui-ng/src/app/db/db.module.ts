import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from './offer.service';
import { UserService } from './user.service';
import { ContactService } from './contact.service';
import { GroupService } from './group.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PermissionService } from './permission.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Http401ErrorsInterceptor } from '../interceptors/http-error-401.interceptor';
import { HttpSessionInterceptor } from '../interceptors/http-session-interceptor';
import { NotificationService } from './notification.service';
import { HttpMonitorInterceptor } from '../interceptors/http-monitor-interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],

  declarations: []
})
export class DbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DbModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpMonitorInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: Http401ErrorsInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpSessionInterceptor,
          multi: true
        },
     
        UserService,
        OfferService,
        ContactService,
        GroupService,
        PermissionService,
        NotificationService
      ]
    };
  }
}
