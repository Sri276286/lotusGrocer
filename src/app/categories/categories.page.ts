import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import tippy from 'tippy.js';

@Component({
    selector: 'lotus-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoryPage implements OnInit {
    categories;
    tippyInstance;
    subcategory;
    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe((res: any) => {
            console.log('res ', res);
            this.categories = res && res.categories;
        });
    }

    showSub(category) {
        console.log('aaaa ', category.sub);
        this.subcategory = category.sub;
        const template = document.getElementById('template');
        tippy('#categ', {
            content: template.innerHTML,
            allowHTML: true,
            interactive: true,
            placement: "bottom",
            appendTo: document.body,
            theme: 'light'
        });
        // this.tippyInstance = template.innerHTML._tippy;
    }

    removeSub() {
        // this.tippyInstance.destroy();
        this.subcategory = [];
    }
}