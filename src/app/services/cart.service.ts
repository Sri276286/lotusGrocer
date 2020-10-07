import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LotusCommonService } from './common.service';
import { ApiConfig } from '../apiconfig/api.config';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Product } from '../models/product';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public cartEntity$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private cartEntity = {
        total: 0,
        cartItems: []
    };

    constructor(private commonService: LotusCommonService,
        private http: HttpClient) {

    }

    addProduct(item: Product) {
        console.log('item before => ', item);
        item.quantity++;
        const isLoggedIn = this.commonService.isLogin();
        if (isLoggedIn) {
            this.postToCart(item);
        } else {
            this.updateCart(item);
        }
        this.commonService.presentToast(`Successfully added ${item.product_name} to the basket.`);
    }

    removeProduct(item: Product) {
        item.quantity--;
        const isLoggedIn = this.commonService.isLogin();
        if (isLoggedIn) {
            this.postToCart(item);
        } else {
            this.updateCart(item);
        }
        this.commonService.presentToast(`Successfully removed ${item.product_name} to the basket.`);
    }

    /**
     * API to load cart details
    */
    getCartItems() {
        const isLoggedIn = this.commonService.isLogin();
        if (isLoggedIn) {
            return this.http.get(`${ApiConfig.commonCartAndOrderURL}/IN_CART`)
                .pipe(map((res: any) => {
                    const cart = res && res.orders && res.orders.length && res.orders[0];
                    if (cart && cart.billTotal && cart.cartItems) {
                        this.cartEntity.total = cart.billTotal;
                        this.manageCart();
                    } else {
                        // show error
                    }
                    return cart;
                }, () => {
                    // show error
                    return throwError(`Failed to get details`);
                }));
        } else {
            let cart = this.getCart();
            if (cart) {
                return of(cart).pipe(tap(() => {
                    this.cartEntity = cart;
                    this.manageCart();
                }))
            } else {
                return throwError('Cannot fetch details');
            }
        }
    }

    /**
     * Push to BE when item is added or removed
     * @param item
    */
    postToCart(item) {
        const entity = {
            product_id: item.product_id,
            quantity: item.quantity
        };
        this.http.put(ApiConfig.cartUpdateURL, entity).subscribe(() => {
            this.updateCart(item);
        });
    }

    updateCart(item: Product) {
        console.log('item => ', item, typeof item.discount_price);
        let isItemInCart = this.cartEntity && this.cartEntity.cartItems.find(t => t.product_id === item.product_id);
        let itemIndex = isItemInCart && this.cartEntity && this.cartEntity.cartItems.indexOf(isItemInCart);
        console.log('isItemInCart ', isItemInCart);
        console.log('itemIndex ', itemIndex);
        if (!isItemInCart) {
            this.cartEntity.cartItems = [...this.cartEntity.cartItems, item];
            this.cartEntity.total += item.discount_price;
        } else {
            if (item && item.quantity) {
                this.cartEntity.cartItems[itemIndex] = item;
                this.cartEntity.total += item.discount_price;
            } else {
                this.cartEntity.cartItems.splice(itemIndex, 1);
                this.cartEntity.total -= item.discount_price;
            }
        }
        // save in local storage
        const isLoggedIn = this.commonService.isLogin();
        if (!isLoggedIn) {
            this.setInLocalStorage();
        }
        this.manageCart();
    }

    private manageCart() {
        console.log('entittttyyy => ', this.cartEntity);
        this.cartEntity$.next(this.cartEntity);
    }

    setInLocalStorage() {
        localStorage.setItem(`cartEntity`, JSON.stringify(this.cartEntity));
    }

    /**
     * Get cart items total count
     */
    getCartCount() {
        const isLoggedIn = this.commonService.isLogin();
        if (isLoggedIn) {
            return this.http.get(ApiConfig.cartTotalURL);
        } else {
            let cart = this.getCart();
            if (cart) {
                return of(cart && cart.cartItems && cart.cartItems.length);
            } else {
                return throwError('Cannot get count');
            }
        }
    }

    private getCart() {
        let cartEntity = localStorage.getItem('cartEntity');
        let cart = cartEntity ? JSON.parse(cartEntity) : null;
        return cart;
    }
}