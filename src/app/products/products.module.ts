import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ProductsPage } from './products.page';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductPage } from './product/product.page';
import { AddProductPage } from './addproduct/addproduct.page';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage,
    ProductPage]
})
export class ProductsPageModule { }
