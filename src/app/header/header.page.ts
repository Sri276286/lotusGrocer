import { Component } from '@angular/core';
import { CategoryPage } from '../categories/categories.page';
import { LotusCommonService } from '../services/common.service';
import { CredentialsPage } from './credentials/credentials.page';
import { LoginPage } from './login/login.page';

@Component({
    selector: 'lotus-header',
    templateUrl: 'header.page.html',
    styleUrls: ['header.page.scss']
})
export class HeaderPage {

    show_search_list = false;
    constructor(private commonService: LotusCommonService) {

    }
    loginPopover() {
        this.commonService.presentPopover(CredentialsPage, null, 'login-popover');
    }

    showSearch(event) {
        console.log('show search');
        this.show_search_list = true;
        // this.commonService.presentPopover(LoginPage, null, '', event);
    }

    showCategories(event) {
        this.commonService.presentPopover(CategoryPage, null, 'categories-popover', event);
    }
}