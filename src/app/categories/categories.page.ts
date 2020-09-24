import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import { LotusCommonService } from '../services/common.service';
import { SubCategListPage } from './subcateg-list/subcateg-list.page';

@Component({
    selector: 'lotus-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoryPage implements OnInit {
    categories;
    constructor(private categoryService: CategoryService) {

    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe((res: any) => {
            console.log('res ', res);
            this.categories = res && res.categories;
        });
    }
}