import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductPage } from './addproduct/addproduct.page';
import { ProductPage } from './product/product.page';
import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  }, {
    path: ':id',
    component: ProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsPageRoutingModule { }
