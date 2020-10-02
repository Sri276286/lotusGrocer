import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'lotus-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
})
export class ProductPage implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.productService.getProduct(id).subscribe((res: Product) => {
        this.product = res;
      });
    });
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

}
