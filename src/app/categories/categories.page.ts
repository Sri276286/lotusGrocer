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
        console.log('aaaa ', category.name, category.sub);
        console.log('instance => ', this.tippyInstance);
        tippy('#' + category.id, {
            interactive: true,
            placement: "bottom",
            appendTo: document.body,
            arrow: false,
            onCreate(instance) {
                console.log('bbbb', category.sub);
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
}