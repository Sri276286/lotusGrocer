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
    userDetailsUrl: string = 'assets/static/user.json';
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
            if (res && res.accessToken) {
                localStorage.setItem('auth_token', res.accessToken);
                localStorage.setItem('session_active', 'true');
                localStorage.setItem('admin', res.isAdmin);
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

    /**
 * Get user details
 */
    public getUser() {
        // return this.http.get(ApiConfig.userDetailsURL)
        return this.http.get(this.userDetailsUrl)
            .pipe(map((res: any) => {
                const user = res;
                // login successful if there's a jwt token in the response
                return user;
            }));
    }

}
