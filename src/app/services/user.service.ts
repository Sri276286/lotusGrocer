import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserAddress } from '../models/address';
import { ApiConfig } from '../apiconfig/api.config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    primaryAddressURL: string = 'assets/static/primary-address.json';
    userAddressListURL: string = 'assets/static/address-list.json';
    constructor(private _http: HttpClient) {
    }

    /**
     * Get user address list
     */
    getAddressList() {
        return this._http.get(this.userAddressListURL)
            // return this._http.get(ApiConfig.userAddressListURL)
            .pipe(map((res: any) => {
                console.log('rrr => ', res);
                return this._mapAddressList(res && res.data);
            }));
    }

    /**
     * Get Primary Address
     */
    getPrimaryAddress(): Observable<UserAddress> {
        // return this._http.get();
        return this._http.get<UserAddress>(this.primaryAddressURL);
    }

    setPrimaryAddress(address: UserAddress) {
        return this._http.post(ApiConfig.setPrimaryAddressURL, address);
    }

    /**
     * Add a new address
     */
    addAddress(address) {
        return this._http.post(ApiConfig.userAddressAddURL, address);
    }

    /**
     * Update address
     * @param address
     */
    updateAddress(address) {
        return this._http.post(ApiConfig.userAddressUpdateURL, address);
    }

    /**
     * Delete address
     * @param address
     */
    deleteAddress(id) {
        return this._http.delete(`${ApiConfig.userAddressDeleteURL}/${id}`);
    }

    /**
     * Map primary address to top list
     * @param addressList
     */
    private _mapAddressList(addressList: UserAddress[]) {
        // find primary address
        const primary = addressList.find(t => t.primaryAddress);
        if (primary) {
            const index = addressList.indexOf(primary);
            // remove from list
            addressList.splice(index, 1);
            // add to beginning
            addressList.unshift(primary);
        }
        return addressList;
    }
}
