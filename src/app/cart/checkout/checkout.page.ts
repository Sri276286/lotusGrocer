import { Component, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/models/address';
import { AddressListPage } from 'src/app/profile/address-list/address-list.page';
import { AddressPage } from 'src/app/profile/address/address.page';
import { CartService } from 'src/app/services/cart.service';
import { LotusCommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'lotus-checkout',
    templateUrl: 'checkout.page.html',
    styleUrls: ['checkout.page.scss']
})
export class CheckoutPage implements OnInit {
    userAddress: UserAddress;
    cartTotal;
    constructor(private userService: UserService,
        private cartService: CartService,
        private commonService: LotusCommonService) {
    }

    ngOnInit() {
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
        this.commonService.presentPopover(AddressListPage, { fromCheckout: true }, 'delivery-address-popover');
    }
}