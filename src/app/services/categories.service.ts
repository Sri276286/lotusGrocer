import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../apiconfig/api.config';

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

    addCategory(category) {
        return this.http.post(ApiConfig.addCategoryURL, category);
    }

    editCategory(category) {
        return this.http.post(ApiConfig.updateCategoryURL, category);
    }

    addSubCategory(category, subcategory) {
        return this.http.post(ApiConfig.addSubCategoryURL, category, subcategory);
    }

    editSubCategory(category, subcategory) {
        return this.http.post(ApiConfig.updateSubCategoryURL, category, subcategory);
    }
}