import { Component, OnInit } from '@angular/core';
import { Product, ProductEntity } from '../models/product';
import { CartService } from '../services/cart.service';
import { LotusCommonService } from '../services/common.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'lotus-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss'],
})
export class ProductsPage implements OnInit {

  productEntity: ProductEntity;
  allSelected: boolean = true;
  products: Product[] = [];
  breadcrumb = [];
  isAdmin: boolean = false;
  constructor(private productService: ProductsService,
    private cartService: CartService,
    private commonService: LotusCommonService) { }

  ngOnInit() {
    this.loadProducts();
    this.commonService.isAdmin$.subscribe(() => {
      this.isAdmin = this.commonService.isAdmin();
    });
  }

  loadProducts(sub?: string) {
    this.productService.getProducts(sub)
      .subscribe((res: ProductEntity) => {
        this.productEntity = res;
        if (res && res.subcategory && res.subcategory.length > 0) {
          this.allSelected = !res.subcategory.some(sub => sub.selected);
          console.log('all selected => ', this.allSelected);
        }
        this.products = res && res.products;
        this.breadcrumb = [
          { label: 'Home', path: '/' },
          { label: this.products && this.products.length && this.products[0].category || '' }
        ];
      });
  }

  loadBySubCategory(sub: string) {
    this.loadProducts(sub);
  }

  /**
   * Add item to the cart
  */
  addItem(item) {
    this.cartService.addProduct(item);
  }

  /**
   * Remove item from the cart
   * @param item
   */
  removeItem(item) {
    this.cartService.removeProduct(item);
  }

  onWeightChange(event, item) {
    // map quantity for already selected weights
    // item = this._mapItemOnWeightChange(item);
    let weightEntity = item.weights.find(t => t.weight === item.weight);
    item.weight = weightEntity.weight;
    item.original_price = weightEntity.original_price;
    item.discount_price = weightEntity.discount_price;
    item.quantity = weightEntity.quantity;
    item.imageurl = weightEntity.imageurl;
  }

  private _mapItemOnWeightChange(item) {
    const units = item.weights;
    if (item.quantity && units
      && units.length) {
      item.weights = units.map((t) => {
        if (t.id === item.storeInventoryProductUnitId) {
          t.quantity = item.quantity;
        }
        return t;
      });
    }
    return item;
  }

  public deleteAlert(product) {
    this.commonService.deleteProduct$.next(product);
  }

}
