import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
    is_default_address = 'default';
    userAddressData: UserAddress[] = [];
    isFromDeliverPage: boolean = false;
    isLogin: boolean = false;

    constructor(private _userService: UserService,
        public modalCtrl: ModalController,
        private _commonService: LotusCommonService,
        private _alertCtrl: AlertController) {
    }

    ngOnInit() {
        this._commonService.loginSuccess$.subscribe(() => {
            this.isLogin = this._commonService.isLogin();
        });
        this.getAddresses();
        this._commonService.addressSaved$.subscribe((isSaved) => {
            if (isSaved) {
                this.getAddresses();
            }
        });
    }

    /**
     * Get list of addresses
     */
    getAddresses() {
        this._userService.getAddressList()
            .subscribe((res: any) => {
                this.userAddressData = res;
                localStorage.setItem('add_list', JSON.stringify(this.userAddressData));
            });
    }

    /**
     * Add address
     */
    addAddress() {
        this._commonService.presentPopover(AddressPage, { isNew: true }, 'address-popover');
    }

    /**
     * Edit an address
     */
    editAddress(address: UserAddress) {
        this._commonService.presentPopover(AddressPage, { address }, 'address-popover');
    }

    removeAddress(address: UserAddress) {
        if (address.primaryAddress) {
            this._commonService.presentToast('Please set another address as default address before deleting this.');
        } else {
            this.presentAlert(address);
        }
    }

    //select address from address book and publish it as event for the delivery page to subscribe and get it
    selectAddress(userAddress: UserAddress) {
        this._commonService.addressSelected$.next(userAddress);
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
        this._userService.deleteAddress(id).subscribe(() => {
            this.getAddresses();
        });
    }
}
