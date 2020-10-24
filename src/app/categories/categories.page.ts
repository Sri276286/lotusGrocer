import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import tippy from 'tippy.js';
import { LotusCommonService } from '../services/common.service';
import { SubCategListPage } from './subcateg-list/subcateg-list.page';

@Component({
    selector: 'lotus-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoryPage implements OnInit {
    categories;
    tippyInstance;
    subcategory;
    constructor(private categoryService: CategoryService,
        private commonService: LotusCommonService) {
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe((res: any) => {
            this.categories = res && res.categories;
        });
    }

    showSub(event, category) {
        // this.commonService.presentPopover(SubCategListPage, {subcateg: category.sub}, 'subcateg-popover', event, false);
        tippy('#' + category.id, {
            interactive: true,
            placement: "bottom",
            appendTo: document.body,
            arrow: true,
            onCreate(instance) {
                var ul = document.createElement('ul');
                ul.style.listStyle = 'none';
                ul.style.margin = '0';
                ul.style.padding = '0';
                // ul.className = 'liststyle';
                category.sub.forEach((x) => {
                    var li = document.createElement('li');
                    li.innerHTML = x.name;
                    li.style.textAlign = 'center';
                    li.style.padding = '2px';
                    li.style.borderBottom = category.sub.length > 1 ? '1px solid grey' : 'none';
                    li.style.cursor = 'pointer';
                    // ul.classList.add('liststyle');
                    ul.appendChild(li);
                });
                instance.setContent(ul);
            }
        });
    }

    // dismissPopover() {
    //     console.log('aaaa');
    //     this.commonService.dismissPopover();
    // }
}