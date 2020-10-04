import { Component } from '@angular/core';
import { CredentialsPage } from '../header/credentials/credentials.page';
import { LotusCommonService } from '../services/common.service';

@Component({
  selector: 'lotus-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage {
  canLogin: boolean = false;
  constructor(private commonService: LotusCommonService) {
    this.commonService.loginSuccess$.subscribe(() => {
      this.canLogin = this.commonService.isLogin();
    });
  }

  loginPopover() {
    this.commonService.presentPopover(CredentialsPage, null, 'login-popover');
  }

}
