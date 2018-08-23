import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../db/authentication.service';

@Injectable()
export class Http401ErrorsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authSerivce.clearSession();
              this.router.navigate(['/login']);
            }
          }
        }
      )
    );
  }

  constructor(
    private authSerivce: AuthenticationService,
    private router: Router
  ) {}
}
