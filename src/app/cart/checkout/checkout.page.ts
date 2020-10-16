import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddress } from 'src/app/models/address';
import { AddressListPage } from 'src/app/profile/address-list/address-list.page';
import { AddressPage } from 'src/app/profile/address/address.page';
import { CartService } from 'src/app/services/cart.service';
import { LotusCommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { OrderSuccessPage } from './order-success/order-success.page';

@Component({
    selector: 'lotus-checkout',
    templateUrl: 'checkout.page.html',
    styleUrls: ['checkout.page.scss']
})
export class CheckoutPage implements OnInit {
    userAddress: UserAddress;
    cartTotal;
    deliveryOption = 'self_pickup';
    constructor(private userService: UserService,
        private cartService: CartService,
        private commonService: LotusCommonService,
        private route: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.commonService.addressSelected$.subscribe((address: UserAddress) => {
            this.userAddress = address;
        });
        this.userService.getPrimaryAddress()
            .subscribe((address: UserAddress) => {
                this.userAddress = address;
            });
        this.cartService.cartEntity$.subscribe((entity) => {
            console.log('aaaa ', entity);
            this.cartTotal = entity && entity.total;
        });
    }

    loadAddress() {
        this.commonService.presentModal(AddressListPage, { fromCheckout: true }, 'delivery-address-modal');
    }

    placeOrder(form: NgForm) {
        console.log('forrrrmmmm => ', form);
        const obj = {
            "orderAddress": this.userAddress,
            "orderStatus": "PLACED",
            "deliveryOption": form.value.delivery_option
        };
        console.log('obj => ', obj);
        this.cartService.placeOrder(obj).subscribe(() => {
            // this.commonService.presentModal(OrderSuccessPage, null, 'order-success-modal');
            this.route.navigate(['ordersuccess'], { relativeTo: this.activatedRoute });
            this.cartService.resetCart();
            // this.modalCtrl.dismiss();
            this.commonService.orderPlaced$.next(true);
        }, (error) => {
            this.commonService.presentToast('Failed to place order. Please try again!');
        });
    }
}