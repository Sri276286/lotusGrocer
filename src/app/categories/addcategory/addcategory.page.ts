import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
    selector: 'lotus-add-category',
    templateUrl: 'addcategory.page.html',
    styleUrls: ['addcategory.page.scss']
})
export class AddCategoryPage implements OnInit {
    category = '';
    subcategory = '';
    categories = [];
    subcategories = [];
    selectedCategory = '';
    selectedSubCategory = '';
    isCategoryAdded: boolean = false;
    categoryForSelect = '';
    isCategorySelected: boolean = false;
    isSubCategorySelected: boolean = false;
    enableEditCategory: boolean = false;
    enableEditSubCategory: boolean = false;
    constructor(private categoryService: CategoryService) {

    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe((res: any) => {
            this.categories = res && res.categories;
        });
    }

    addCategory() {
        this.categoryService.addCategory(this.category).subscribe(() => {
            this.isCategoryAdded = true;
        });
    }

    addSubCategory() {
        this.categoryService.addSubCategory(this.category, this.subcategory).subscribe();
    }

    editCategory() {
        this.categoryService.editCategory(this.selectedCategory).subscribe();
    }

    editSubCategory() {
        this.categoryService.editSubCategory(this.selectedCategory, this.selectedSubCategory).subscribe();
    }

    selectCategory(event) {
        console.log('cat id =. ', event.target.value);
        this.isCategorySelected = true;
        const category = this.categories.find(t => t.id === event.target.value);
        this.selectedCategory = category.name;
        this.subcategories = category.sub;
    }

    selectSubCategory(event) {
        this.isSubCategorySelected = true;
        const subcategory = this.subcategories.find(t => t.id === event.target.value);
        this.selectedSubCategory = subcategory.name;
    }
}