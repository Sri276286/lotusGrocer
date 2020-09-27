import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {


    addProduct(item) {
        item.quantity++;
        // const isLoggedIn = this._commonService.isLogin();
        // if (isLoggedIn) {
        //     this.postToCart(item);
        // } else {
        //     this.updateCart(item);
        // }
    }

    removeProduct(item) {
        item.quantity--;
        // const isLoggedIn = this._commonService.isLogin();
        // if (isLoggedIn) {
        //     this.postToCart(item);
        // } else {
        //     this.updateCart(item);
        // }
    }
}