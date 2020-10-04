import { Component } from '@angular/core';
import { CategoryPage } from '../categories/categories.page';
import { LotusCommonService } from '../services/common.service';
import { CredentialsPage } from './credentials/credentials.page';
import { LoginPage } from './login/login.page';
import { ProfileListPage } from './profile-list/profile-list.page';
import { SearchPage } from './search/search.page';

@Component({
    selector: 'lotus-header',
    templateUrl: 'header.page.html',
    styleUrls: ['header.page.scss']
})
export class HeaderPage {

    show_search_list = false;
    canLogin: boolean = false;
    isAdmin: boolean = false;
    constructor(private commonService: LotusCommonService) {
        this.commonService.loginSuccess$.subscribe(() => {
            this.canLogin = this.commonService.isLogin();
        });
        this.commonService.isAdmin$.subscribe(() => {
            this.isAdmin = this.commonService.isAdmin();
        });
    }
    loginPopover() {
        this.commonService.presentPopover(CredentialsPage, null, 'login-popover');
    }

    showSearch(event) {
        this.show_search_list = true;
        this.commonService.presentPopover(SearchPage, null, 'search-popover', event);
    }

    showCategories(event) {
        this.commonService.presentPopover(CategoryPage, null, 'categories-popover', event, false);
    }

    showProfile(event) {
        this.commonService.presentPopover(ProfileListPage, null, '', event, false);
    }
}