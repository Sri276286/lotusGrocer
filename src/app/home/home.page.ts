import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
// import Swiper from 'swiper/bundle';

// // import Swiper styles
// import 'swiper/swiper-bundle.css';
import { Product } from '../models/product';
import { LotusCommonService } from '../services/common.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('memberDeals') mdslides: IonSlides;
  @ViewChild('promoDeals') pdslides: IonSlides;
  slideOpts = {
    slidesPerView: 5,
    freeMode: true,
    pagination: false
  };
  products = [];
  isAdmin: boolean = false;
  canLogin: boolean = false;
  // mySwiper: Swiper;
  constructor(private productService: ProductsService,
    private commonService: LotusCommonService) {
    this.commonService.isAdmin$.subscribe(() => {
      this.isAdmin = this.commonService.isAdmin();
    });
    this.commonService.loginSuccess$.subscribe(() => {
      this.canLogin = this.commonService.isLogin();
    });
  }

  ngOnInit() {
    this.getMemberDeals();
  }

  getMemberDeals() {
    this.productService.getProducts()
      .subscribe((res: Product[]) => {
        this.products = res;
      });
  }

  slidePrev(slides) {
    for (let i = 0; i < 5; i++) {
      slides.slidePrev();
    }
  }
  slideNext(slides) {
    for (let index = 0; index < 5; index++) {
      slides.slideNext();
    }
  }

}
