import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';

import { CartPageRoutingModule } from './cart-routing.module';
import { RouterModule } from '@angular/router';
import { CheckoutPage } from './checkout/checkout.page';
import { OrderSuccessPage } from './checkout/order-success/order-success.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    CartPageRoutingModule
  ],
  declarations: [
    CartPage,
    CheckoutPage,
    OrderSuccessPage
  ]
})
export class CartPageModule { }
