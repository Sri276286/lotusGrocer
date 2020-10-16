import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './cart.page';
import { CheckoutPage } from './checkout/checkout.page';
import { OrderSuccessPage } from './checkout/order-success/order-success.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage
  }, {
    path: 'checkout',
    component: CheckoutPage,
    children: [
      {
        path: 'ordersuccess',
        component: OrderSuccessPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule { }
