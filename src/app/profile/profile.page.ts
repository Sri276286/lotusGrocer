import { Component } from '@angular/core';
import { LotusCommonService } from '../services/common.service';
import { AddressPage } from './address/address.page';

@Component({
  selector: 'lotus-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  constructor(private commonService: LotusCommonService) { }

  addAddress() {
    this.commonService.presentPopover(AddressPage, {isNew: true}, 'address-popover');
  }

}
