import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    productListUrl: string = 'assets/static/products.json';
    productUrl: string = 'assets/static/product.json';
    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productListUrl);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(this.productUrl);
    }
}
