import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/_models/_classes/Product';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { ProductService } from 'src/app/_services/product.service';
import { ConfirmModalComponent } from '../../_reusableComponents/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('addOrUpdateModelCloseBtn') addOrUpdateModelCloseBtn;
  @ViewChild(ConfirmModalComponent) confirmModal:ConfirmModalComponent;
  private _ProductToUpdate:IProduct;
  allProducts:Product[]; 
  errorMsg:string;
  productForm : FormGroup;
  loading = false;
  submitted = false;
  actionName:string;
  productsCount:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages:number; // productsCount / pageSize

  // convenience getter for easy access to form fields
  get formFields() { return this.productForm.controls; }
  constructor(private _productService:ProductService,
    private _formBuilder: FormBuilder,
    private _router:Router) { }

  ngOnInit(): void {
    this._productService.getProductsCount().subscribe(
      data => {
        this.productsCount = data
        this.numberOfPages = Math.ceil(this.productsCount / this.pageSize)
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
    
    this.productForm = this._formBuilder.group({
      name:['', Validators.required],
      price:['', Validators.required],
      description:[''],
      discount:['', Validators.required],
      image:['', Validators.required],
      quantity:['', Validators.required],
      categoryId:['', Validators.required],
      colorId:['', Validators.required],
    });
    this.getSelectedPage(1);
  }

  private onAddProductSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
      }

    this.loading = true;
    let newProduct:IProduct = {
      id:0 , 
      name : this.formFields.name.value,
      price: this.formFields.price.value,
      description: this.formFields.description.value,
      discount: this.formFields.discount.value,
      image: this.formFields.image.value,
      quantity: this.formFields.quantity.value,
      categoryId: this.formFields.categoryId.value,
      colorId: this.formFields.colorId.value,
    };
    this._productService.addNewProduct(newProduct)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.addOrUpdateModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  private onUpdateProductSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
      }

    this.loading = true;
    this._ProductToUpdate.name = this.formFields.name.value;
    this._ProductToUpdate.price = this.formFields.price.value;
    this._ProductToUpdate.description = this.formFields.description.value;
    this._ProductToUpdate.discount = this.formFields.discount.value;
    this._ProductToUpdate.image = this.formFields.image.value;
    this._ProductToUpdate.quantity = this.formFields.quantity.value;
    this._ProductToUpdate.categoryId = this.formFields.categoryId.value;
    this._ProductToUpdate.colorId = this.formFields.colorId.value;
    console.log(this._ProductToUpdate);
    this._productService.updateProduct(this._ProductToUpdate.id, this._ProductToUpdate)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.addOrUpdateModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  onAddOrUpdateSubmit(){
    if(this.actionName == "Add"){
      this.onAddProductSubmit();
    }else{
      this.onUpdateProductSubmit()
    }
  }
 
  openAddProductModal(){
    this.actionName = "Add";
  }

  openUpdateProductModal(ProductId){
    this.actionName = "Update";
    this._productService.getProductById(ProductId)
        .pipe(first())
        .subscribe(
            data => {
                this.productForm.setValue({
                  name: data.name,
                  price:data.price,
                  description:data.description,
                  discount:data.discount,
                  image:data.image,
                  quantity:data.quantity,
                  categoryId:data.categoryId,
                  colorId:data.colorId
                }); 
                this._ProductToUpdate = data;
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
  openDeleteProductModal(ProductId){
    //this._ProductToDeleteId = ProductId;
    this.confirmModal.pointerToFunction = this._productService.deleteProduct
    this.confirmModal.title = "Delete Product";
    this.confirmModal.itemId = ProductId;
    this.confirmModal.message = "Are you sure to delete this Product";
    this.confirmModal.pageUrl = this._router.url;
    //this.confirmModal.entityName ="Product";
  }

  // pagination
  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber:number){
    this._productService.getProductsByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allProducts = data
        this.currentPageNumber = currentPageNumber;
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }
}
