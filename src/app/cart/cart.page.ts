import { Component, OnInit } from '@angular/core';
import { CredentialsPage } from '../header/credentials/credentials.page';
import { CartService } from '../services/cart.service';
import { LotusCommonService } from '../services/common.service';

@Component({
  selector: 'lotus-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage implements OnInit {
  canLogin: boolean = false;
  items = [];
  cartTotal = 0;
  constructor(private commonService: LotusCommonService,
    private cartService: CartService) {
    this.commonService.loginSuccess$.subscribe(() => {
      this.canLogin = this.commonService.isLogin();
    });
  }

  ngOnInit() {
    this.loadCart();
  }

  loginPopover() {
    this.commonService.presentPopover(CredentialsPage, null, 'login-popover');
  }

  /**
   * Load cart from API
  */
  loadCart() {
    this.cartService.getCartItems().subscribe((res: any) => {
      console.log('load cart res => ', res);
      this.initialize(res);
    });
  }

  initialize(res) {
    this.cartTotal = res && res.billTotal || 0;
    this.items = res && res.cartItems || [];
  }

}
