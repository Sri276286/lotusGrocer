import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserAddress } from 'src/app/models/address';
import { LotusCommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { AddressPage } from '../address/address.page';

@Component({
    selector: 'lotus-address-list',
    templateUrl: 'address-list.page.html',
    styleUrls: ['address-list.page.scss']
})
export class AddressListPage implements OnInit {
    @Input('fromCheckout') fromCheckout = false;
    is_default_address = 'default';
    userAddressData: UserAddress[] = [];
    isFromDeliverPage: boolean = false;
    isLogin: boolean = false;

    constructor(private userService: UserService,
        private commonService: LotusCommonService,
        private _alertCtrl: AlertController,
        private modalCtrl: ModalController) {
    }

    ngOnInit() {
        console.log('ng on init');
        this.commonService.loginSuccess$.subscribe(() => {
            this.isLogin = this.commonService.isLogin();
        });
        this.getAddresses();
        this.commonService.addressSaved$.subscribe((isSaved) => {
            if (isSaved) {
                this.getAddresses();
            }
        });
    }

    /**
     * Get list of addresses
     */
    getAddresses() {
        this.userService.getAddressList()
            .subscribe((res: any) => {
                this.userAddressData = res;
                localStorage.setItem('add_list', JSON.stringify(this.userAddressData));
            });
    }

    /**
     * Add address
     */
    addAddress() {
        this.commonService.presentPopover(AddressPage, { isNew: true }, 'address-popover');
    }

    /**
     * Edit an address
     */
    editAddress(address: UserAddress) {
        this.commonService.presentPopover(AddressPage, { address }, 'address-popover');
    }

    removeAddress(address: UserAddress) {
        if (address.primaryAddress) {
            this.commonService.presentToast('Please set another address as default address before deleting this.');
        } else {
            this.presentAlert(address);
        }
    }

    setPrimary(address: UserAddress) {
        this.userService.setPrimaryAddress(address).subscribe(() => {
            this.getAddresses();
        });
    }

    //select address from address book and publish it as event for the delivery page to subscribe and get it
    selectAddress(userAddress: UserAddress) {
        this.commonService.addressSelected$.next(userAddress);
        this.modalCtrl.dismiss();
    }

    async presentAlert(address: UserAddress) {
        const alert = await this._alertCtrl.create({
            header: `Delete`,
            message: `Do you want to delete this address?`,
            buttons: [
                {
                    text: 'No',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.delete(address.addressId);
                    }
                }
            ]
        });

        await alert.present();
    }

    /**
     * API call to delete address
     */
    delete(id) {
        this.userService.deleteAddress(id).subscribe(() => {
            this.getAddresses();
        });
    }
}
