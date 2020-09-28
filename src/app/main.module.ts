import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPage } from './header/header.page';
import { FooterPage } from './footer/footer.page';
import { CategoryPage } from './categories/categories.page';
import { SubCategListPage } from './categories/subcateg-list/subcateg-list.page';
import { RouterModule } from '@angular/router';
import { LoginPage } from './header/login/login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CredentialsPage } from './header/credentials/credentials.page';
import { SignupPage } from './header/signup/signup.page';
import { AddProductPage } from './products/addproduct/addproduct.page';
import { HomePage } from './home/home.page';
import { ProfileListPage } from './header/profile-list/profile-list.page';

const components = [
    HeaderPage,
    FooterPage,
    CategoryPage,
    SubCategListPage,
    LoginPage,
    SignupPage,
    CredentialsPage,
    HomePage,
    AddProductPage,
    ProfileListPage
];

@NgModule({
    declarations: components,
    exports: components,
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class MainModule { }
