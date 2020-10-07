import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { LotusCommonService } from 'src/app/services/common.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'lotus-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
})
export class ProductPage implements OnInit {

  product: Product;
  breadcrumb = [];
  isAdmin: boolean = false;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private commonService: LotusCommonService,
    private router: Router,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.productService.getProduct(id).subscribe((res: Product) => {
        this.product = res;
        this.breadcrumb = [
          { label: 'Home', path: '/' },
          { label: this.product.category, path: `/products/${this.product.category_id}` },
          { label: this.product.product_name }
        ];
      });
    });
    this.commonService.isAdmin$.subscribe(() => {
      this.isAdmin = this.commonService.isAdmin();
    });
    this.commonService.deleteProduct$.subscribe((product) => {
      this.deleteAlert(product);
    });
  }

  navigateTo(product) {
    this.router.navigate(['/addproduct', { data: { 'product': product } }]);
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
    this.presentAlertConfirm(product);
  }

  async presentAlertConfirm(product) {
    const alert = await this.alertCtrl.create({
      header: 'Delete ' + product.product_name,
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    });

    await alert.present();
  }

  private deleteProduct(product) {

  }

}
