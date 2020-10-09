import { Component, OnInit } from '@angular/core';
import { CategoryPage } from '../categories/categories.page';
import { CartService } from '../services/cart.service';
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
export class HeaderPage implements OnInit {

    show_search_list = false;
    canLogin: boolean = false;
    isAdmin: boolean = false;
    cartQuantity: number = 0;
    constructor(private commonService: LotusCommonService,
        private cartService: CartService) {
        this.commonService.loginSuccess$.subscribe(() => {
            this.canLogin = this.commonService.isLogin();
        });
        this.commonService.isAdmin$.subscribe(() => {
            this.isAdmin = this.commonService.isAdmin();
            console.log('is admin ', this.isAdmin);
        });
    }

    ngOnInit() {
        this.cartService.cartEntity$.subscribe((entity) => {
            console.log('entity => ', entity);
            this.cartQuantity = entity && entity.cartItems && entity.cartItems.length;
        });
        this.getCart();
        this.commonService.orderPlaced$.subscribe(() => {
            this.getCart();
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

    getCart() {
        // load cart when application is loaded
        this.cartService.getCartCount().subscribe((res) => {
            this.cartQuantity = res;
        }, (error) => {
            if (error.status === 500) {
                localStorage.clear();
            }
        });
    }
}