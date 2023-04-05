import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject!: BehaviorSubject<User>;
    public currentUser!: Observable<User>;

    constructor(private http: HttpClient) {
        let localStoreUser = localStorage.getItem('currentUser') || null;
        let user = { accountId: 0 } as User;
        if (localStoreUser) {
            user = JSON.parse(localStoreUser);
        }
        this.currentUserSubject = new BehaviorSubject<User>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    //user type is member or librarian
    login(accountName: string, password: string) {
        //TODO: default is member
        const url = `${apiUrl}/authentication/login`;
        return this.http.post<any>(url, { accountName, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout(accountId: number) {
        //TODO: default is member
        const url = `${apiUrl}/authentication/logout`;
        return this.http.post<any>(url, { accountId })
            .pipe(map(result => {
                // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
                //this.currentUserSubject.next();
            }));
    }
}