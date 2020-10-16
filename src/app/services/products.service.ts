import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductEntity } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    productListUrl: string = 'assets/static/products.json';
    productUrl: string = 'assets/static/product.json';
    constructor(private http: HttpClient) {
    }

    getProducts(sub?: string): Observable<ProductEntity> {
        return this.http.get<ProductEntity>(this.productListUrl);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(this.productUrl);
    }
}
