import { Component, OnInit, ViewChild } from '@angular/core';
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
    @ViewChild('tar') mytar;
    constructor(private categoryService: CategoryService,
        private commonService: LotusCommonService) {

    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe((res: any) => {
            console.log('res ', res);
            this.categories = res && res.categories;
        });
    }

    loadSubCategories(subcateg) {
        console.log('mouse over');
        this.commonService.presentPopover(SubCategListPage, {
            subcateg
        }, {target: this.mytar.el});
    }

    closeSubCategories() {
        console.log('mouse leave');
        // this.commonService.dismissPopover();
    }
}