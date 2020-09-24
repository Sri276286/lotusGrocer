import { Component } from '@angular/core';

@Component({
    selector: 'lotus-credentials',
    templateUrl: 'credentials.page.html',
    styleUrls: ['credentials.page.scss']
})
export class CredentialsPage {
    canLogin: boolean = true;
    loadLoginOrSignup(flag: number) {
        if (flag) {
            this.canLogin = false;
        } else {
            this.canLogin = true;
        }
    }
}