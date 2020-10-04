import { Component } from '@angular/core';
import { LotusCommonService } from 'src/app/services/common.service';

@Component({
    selector: 'lotus-profile-list',
    templateUrl: 'profile-list.page.html',
    styleUrls: ['profile-list.page.scss']
})
export class ProfileListPage {

    isAdmin: boolean = false;
    constructor(private commonService: LotusCommonService) {
        this.commonService.isAdmin$.subscribe((flag) => {
            this.isAdmin = flag;
        });
    }

    doLogout() {
        localStorage.clear();
        this.commonService.loginSuccess$.next(false);
        this.commonService.dismissPopover();
    }
}
