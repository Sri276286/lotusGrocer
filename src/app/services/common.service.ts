import { Injectable } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { UserAddress } from '../models/address';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class LotusCommonService {
    popover;
    loginSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    addProduct$: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
    editProduct$: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
    deleteProduct$: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
    orderPlaced$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    addressSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    addressSelected$: BehaviorSubject<UserAddress> = new BehaviorSubject<UserAddress>(null);
    constructor(private popoverController: PopoverController,
        private toastCtrl: ToastController) { }

    public isLogin() {
        const auth_token = localStorage.getItem("auth_token");
        const session_active = localStorage.getItem("session_active");
        return auth_token && session_active ? true : false;
    }

    public isAdmin() {
        const isAdmin = localStorage.getItem('admin');
        return isAdmin === 'true';
    }

    async presentPopover(component, data?: any, cssclass?: any, ev?: any, backdrop: boolean = true) {
        console.log('comp => ', component);
        this.popover = await this.popoverController.create({
            component: component,
            componentProps: data,
            cssClass: cssclass,
            event: ev,
            translucent: true,
            animated: true,
            backdropDismiss: true,
            showBackdrop: backdrop
        });
        return await this.popover.present();
    }

    async presentToast(message: string, position?: "top" | "bottom" | "middle") {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: position
        });
        toast.present();
    }

    dismissPopover() {
        this.popover.dismiss();
    }
}