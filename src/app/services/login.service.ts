import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ApiConfig } from '../apiconfig/api.config';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    loginUrl: string = 'assets/static/login.json';
    constructor(private http: HttpClient) {
    }

    /**
     * Do Login and get user details
     * Also post if any items added in cart
     * @param user
     */
    public login(user: any): Observable<any> {
        let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
        let options = {
            headers: httpHeaders
        };
        return this.http.get(this.loginUrl).pipe(map((res: any) => {
            console.log('login ressss => ', res);
            if (res && res.accessToken) {
                localStorage.setItem('auth_token', res.accessToken);
                localStorage.setItem('session_active', 'true');
                return res;
            } else {
                return throwError(`No access token received`);
            }
        }));
    }

    /**
     * signup a new user
     * @param user
     */
    public register(user: any): Observable<any> {
        let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
        let options = {
            headers: httpHeaders
        };
        return this.http.post(ApiConfig.signupURL, user, options);
    }

}
