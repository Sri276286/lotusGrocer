import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'lotus-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
        private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * Submit login form
     * @param isvalid
    */
    submit(isvalid: boolean) {
        if (isvalid) {
            this.loginService.login(this.loginForm.value).subscribe(() => {
                // this._commonService.loginSuccess$.next(true);
            });
        }
    }
}