import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'lotus-signup',
    templateUrl: 'signup.page.html',
    styleUrls: ['signup.page.scss']
})
export class SignupPage {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private _router: Router) {
        this.registerForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.email]],
            mobileNumber: ["", Validators.required],
            password: ["", Validators.required],
            confirm_password: ["", Validators.required]
        });
    }

    /**
     * Submit register form
     * @param isValid
     */
    onSubmit(isValid: boolean) {
        if (isValid) {
            this.loginService.register(this.registerForm.value).subscribe(() => {
                this._router.navigate(['/login']);
            });
        }
    }
}