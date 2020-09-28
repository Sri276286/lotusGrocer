import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LotusCommonService {
    popover;
    constructor(private popoverController: PopoverController) { }

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