import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LotusCommonService {
    popover;
    constructor(private popoverController: PopoverController) { }

    async presentPopover(component, data, ev?: any) {
        this.popover = await this.popoverController.create({
            component: component,
            componentProps: data,
            event: ev,
            translucent: true,
            animated: true,
            backdropDismiss: true
        });
        return await this.popover.present();
    }

    dismissPopover() {
        this.popover.dismiss();
    }
}