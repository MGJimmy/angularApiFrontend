import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/_classes/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, PasswordHash: string) {
        return this.http.post<any>(`${environment.apiUrl}/Login`, { username, PasswordHash })
            .pipe(map(res => {
                this.setSession(res);
            }));
    }

   
    private setSession(authResult) {
        //const expiresAt = moment().add(authResult.expiresIn,'second');
        const expiresAt = authResult.expiration;
        localStorage.setItem('token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt));//.valueOf()) );
    }  

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
        this.router.navigate(['/login']);
    }
    
    public isLoggedIn() {
        return localStorage.getItem('token') != null ? true : false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
    /*          
    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }  
    */
}