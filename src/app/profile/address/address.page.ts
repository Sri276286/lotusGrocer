import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { take } from 'rxjs/operators';
import { UserAddress } from 'src/app/models/address';
import { CartService } from 'src/app/services/cart.service';
import { LotusCommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'lotus-address',
    templateUrl: 'address.page.html',
    styleUrls: ['address.page.scss']
})
export class AddressPage implements OnInit {
    editMainDetails = true;
    user;
    userAddress: FormGroup;
    @Input() isNew;
    @Input() address;
    cartTotal: number;
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private commonService: LotusCommonService,
        private cartService: CartService,
        private userService: UserService
    ) { }

    ngOnInit() {
        console.log('aaa ddd ', this.address);
        this.userAddress = this.fb.group({
            addressId: [""],
            name: ["", Validators.required],
            phoneNumber: [
                "",
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            homeNo: ["", Validators.required],
            apartment: [""],
            street: ["", Validators.required],
            landmark: [""],
            area: ["", Validators.required],
            city: ["", Validators.required],
            pincode: [
                "",
                [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
            ],
            type: ["HOME"],
            primaryAddress: [false],
        });
        if (this.address) {
            this.userAddress.patchValue(this.address);
        }

        this.loginService.getUser().subscribe((user: any) => {
            console.log('userrrr => ', user);
            this.user = user;
            this.userAddress.get('name').setValue(this.user.name);
            this.userAddress.get('phoneNumber').setValue(this.user.mobileNumber);
        });
    }

    getAddressById(id: string) {
        const add_list = JSON.parse(localStorage.getItem("add_list"));
        return add_list.find((t) => t.addressId === +id);
    }

    onSubmit(isValid) {
        console.log('isvalid ', isValid);
        const { addressId, ...addressWithoutId } = this.userAddress.value;
        const addressIdObject: UserAddress = addressWithoutId;
        addressIdObject.name = this.userAddress.value.name;
        console.log('addressssss => ', addressIdObject);
        if (isValid) {
            if (this.isNew) {
                this.userService.addAddress(addressIdObject).subscribe(() => {
                    this.commonService.addressSaved$.next(true);
                });
            } else {
                this.userService
                    .updateAddress(this.userAddress.value)
                    .subscribe(() => {
                        this.commonService.addressSaved$.next(true);
                        this.commonService.addressSelected$.next(this.userAddress.value as UserAddress);

                    });
            }
        }
    }



}
