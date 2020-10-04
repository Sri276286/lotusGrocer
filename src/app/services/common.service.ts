import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LotusCommonService {
    popover;
    loginSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private popoverController: PopoverController) { }

    public isLogin() {
        const auth_token = localStorage.getItem("auth_token");
        const session_active = localStorage.getItem("session_active");
        return auth_token && session_active ? true : false;
    }

    public isAdmin() {
        const isAdmin = localStorage.getItem("admin");
        return isAdmin ? true : false;
    }

    async presentPopover(component, data?: any, cssclass?: any, ev?: any, backdrop: boolean = true) {
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

    dismissPopover() {
        this.popover.dismiss();
    }
}