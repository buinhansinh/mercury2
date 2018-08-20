import { tap, timeout } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthenticationService } from "../db/authentication.service";
export const TEN_SECONDS = 10000;
@Injectable()
export class HttpSessionInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req.clone({withCredentials: true})).pipe(timeout(TEN_SECONDS));
    }
}
