import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPage } from './header/header.page';
import { FooterPage } from './footer/footer.page';
import { CategoryPage } from './categories/categories.page';
import { SubCategListPage } from './categories/subcateg-list/subcateg-list.page';

const components = [
    HeaderPage,
    FooterPage,
    CategoryPage,
    SubCategListPage
];

@NgModule({
    declarations: components,
    exports: components,
    imports: [CommonModule],
})
export class MainModule { }
