import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lotus-add-product',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
})
export class AddProductPage implements OnInit {

  productForm: FormGroup;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('dataaaaa => ', paramMap.get('data'));
    });
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      id: '',
      product_name: ['', Validators.required],
      product_origin: '',
      product_description: '',
      category: '',
      sub_category: '',
      weights: this.fb.array([this.weightForm()]),
      available_quantity: '',
      max_quantity: '',
      original_price: '',
      discount_price: '',
      imageurl: '',
      quantity: '',
      unit: '',
      weight: ''
    });
  }

  // convenience getters for easy access to form fields
  get f() { return this.productForm.controls; }
  get w() { return this.f.weights as FormArray; }

  weightForm(): FormGroup {
    return this.fb.group({
      imageurl: '',
      id: '',
      available_quantity: ['', Validators.required],
      weight: ['', Validators.required],
      unit: ['kg', Validators.required],
      original_price: [''],
      discount_price: ['', Validators.required],
      max_quantity: '',
      quantity: '',
      Default: false
    });
  }

  addWeight() {
    this.w.push(this.weightForm());
  }

  /**
   * Add new product/ Update existing product
   */
  submitProduct() {
    const isValid = this.productForm.valid;
    if (isValid) {
      // this._menuService.addProduct(this.productForm.value).subscribe(() => {
      // }, () => {
      // });
    }
  }

}
