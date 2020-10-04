import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ProductsPage } from './products.page';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductPage } from './product/product.page';
import { RouterModule } from '@angular/router';
import { BreadcrumbPage } from './breadcrumb/breadcrumb.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ProductsPageRoutingModule
  ],
  declarations: [
    ProductsPage,
    ProductPage,
    BreadcrumbPage
  ],
  exports: [
    BreadcrumbPage
  ]
})
export class ProductsPageModule { }
