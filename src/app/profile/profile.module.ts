import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { AddressPage } from './address/address.page';
import { AddressListPage } from './address-list/address-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule
  ],
  declarations: [
    ProfilePage,
    AddressListPage,
    AddressPage
  ]
})
export class ProfilePageModule { }
