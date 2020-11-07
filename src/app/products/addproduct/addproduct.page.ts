import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'lotus-add-product',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
})
export class AddProductPage implements OnInit {

  productForm: FormGroup;
  categories = [];
  subcategories = [];
  @Input() product;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('dataaaaa => ', paramMap.get('data'));
    });
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productId: '',
      productName: ['', Validators.required],
      brand: '',
      countryOfOrigin: '',
      description: '',
      category: '',
      categoryId: '',
      subCategory: '',
      subCategoryId: '',
      listOfWeights: this.fb.array([this.weightForm()]),
      availableQuantity: '',
      totalQuantity: 0,
      originalPrice: '',
      discountPrice: '',
      imageURL: '',
      quantity: 0,
      unit: '',
      weight: '',
      memberDealDiscount: 0,
      promoDealDiscount: 0
    });
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res && res.categories;
    });
  }

  // convenience getters for easy access to form fields
  get f() { return this.productForm.controls; }
  get w() { return this.f.listOfWeights as FormArray; }

  weightForm(): FormGroup {
    return this.fb.group({
      imageURL: '',
      id: '',
      availableQuantity: [0, Validators.required],
      weight: ['', Validators.required],
      unit: ['kg', Validators.required],
      originalPrice: [''],
      discountPrice: ['', Validators.required],
      totalQuantity: 0,
      quantity: 0,
      default: false
    });
  }

  addWeight() {
    this.w.push(this.weightForm());
  }

  selectCategory(event) {
    console.log('event ', event.target.value);
    console.log('categr ', this.categories);
    const category = this.categories.find(t => t.id === event.target.value);
    this.subcategories = category.sub;
  }

  /**
   * Add new product/ Update existing product
   */
  submitProduct() {
    const isValid = this.productForm.valid;
    console.log('product => ', this.productForm.value);
    if (isValid) {
      // this._menuService.addProduct(this.productForm.value).subscribe(() => {
      // }, () => {
      // });
    }
  }

}
