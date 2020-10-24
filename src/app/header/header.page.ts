import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CategoryPage } from '../categories/categories.page';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/categories.service';
import { LotusCommonService } from '../services/common.service';
import { LoginService } from '../services/login.service';
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
    username: string = '';
    menuItems: MenuItem[];
    constructor(private commonService: LotusCommonService,
        private cartService: CartService,
        private loginService: LoginService,
        private categoryService: CategoryService) {
        this.commonService.loginSuccess$.subscribe(() => {
            this.canLogin = this.commonService.isLogin();
        });
        this.commonService.isAdmin$.subscribe(() => {
            this.isAdmin = this.commonService.isAdmin();
            console.log('is admin ', this.isAdmin);
        });
        this.loginService.getUser().subscribe((user) => {
            console.log('user => ', user);
            this.username = user && user.name;
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
        this.categoryService.getCategories().subscribe((res) => {
            console.log('rrr ', res);
            this.menuItems = this.loadMenuItems(res);
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

    loadMenuItems(res) {
        const menuItems = [];
        const categories = res && res.categories;
        categories.map((categ) => {
            let menuItem: MenuItem = {
                label: '',
                items: []
            };
            menuItem.label = categ.name;
            categ.sub.map((subcateg) => {
                let allMenuItem = {
                    label: 'View All',
                    routerLink: ['/products', categ.id]
                };
                menuItem.items.push(allMenuItem);
                let submenuItem: MenuItem = {
                    label: '',
                    routerLink: ''
                };
                submenuItem.label = subcateg.name;
                submenuItem.routerLink = ['/products', categ.id, subcateg.id];
                menuItem.items.push(submenuItem);
            });
            menuItems.push(menuItem);
        });
        return menuItems;
    }
}