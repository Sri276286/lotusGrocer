import { Component } from '@angular/core';
import { LotusCommonService } from 'src/app/services/common.service';

@Component({
    selector: 'lotus-profile-list',
    templateUrl: 'profile-list.page.html',
    styleUrls: ['profile-list.page.scss']
})
export class ProfileListPage {

    constructor(private commonService: LotusCommonService) {
    }

    doLogout() {
        localStorage.clear();
        this.commonService.loginSuccess$.next(false);
        this.commonService.dismissPopover();
    }
}
