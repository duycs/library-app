import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/shared/models/user';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    constructor(private authenticationService: AuthenticationService) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout(this.currentUser.accountId);
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}