import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
// import Swiper from 'swiper/bundle';

// // import Swiper styles
// import 'swiper/swiper-bundle.css';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    slidesPerView: 5,
    freeMode: true,
    pagination: false
  };
  products = [];
  // mySwiper: Swiper;
  constructor(private productService: ProductsService) {
  }

  ngOnInit() {
    this.getMemberDeals();
  }

  getMemberDeals() {
    this.productService.getProducts()
      .subscribe((res: Product[]) => {
        console.log('ressss => ', res);
        this.products = res;
      });
  }

  slidePrev() {
    for (let i = 0; i < 5; i++) {
      this.slides.slidePrev();
    }
  }
  slideNext() {
    for (let index = 0; index < 5; index++) {
      this.slides.slideNext();
    }
  }

}
