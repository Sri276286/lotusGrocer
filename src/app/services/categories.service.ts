import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categoryListUrl: string = 'assets/static/categories.json';
    constructor(private http: HttpClient) {
    }

    getCategories() {
        return this.http.get(this.categoryListUrl);
    }
}