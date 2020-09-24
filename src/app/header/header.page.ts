import { Component } from '@angular/core';
import { LotusCommonService } from '../services/common.service';
import { CredentialsPage } from './credentials/credentials.page';

@Component({
    selector: 'lotus-header',
    templateUrl: 'header.page.html',
    styleUrls: ['header.page.scss']
})
export class HeaderPage {

    constructor(private commonService: LotusCommonService) {

    }
    loginPopover() {
        this.commonService.presentPopover(CredentialsPage, null, 'login-popover');
    }
}