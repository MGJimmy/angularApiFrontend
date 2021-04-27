import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { IReview } from 'src/app/_models/_interfaces/IReview';
import { IReviewVM } from 'src/app/_models/_interfaces/IReviewVM';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReviewService } from 'src/app/_services/review.service';
import { WishlistService } from 'src/app/_services/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productID: number;
  product: IProduct;
  errorMsg: string;
  reviewForm: FormGroup;
  allReviews:IReviewVM[]; 
  currentUserReview:IReviewVM;
  hasReview:Boolean;

  loading = false;
  submitted = false;
  
  reviewsCount:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages:number; // categoriesCount / pageSize

  get formFields() { return this.reviewForm.controls; }
  constructor(private _route: ActivatedRoute,
     private _productServie: ProductService,
      private _spinner: NgxSpinnerService,
      private _cartService:CartService,
      private _wishlistService:WishlistService,
      private _router:Router,
      private _formBuilder: FormBuilder,
      private _reviewService:ReviewService) { }

  ngOnInit(): void {
    this._spinner.show();
    this.getProductIdFromUrl();
    this.getCurrentProduct();
    this.getUserReview();
    this.formBuildAndBind();
    this.initPaging();    
    }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
  // private functions
  private getCurrentProduct(){
    this._productServie.getProductById(this.productID)
    .pipe(first())
    .subscribe(
      data => {
        this.product = data;
        this._spinner.hide();
      },
      error => {
        this.errorMsg = error;

      });
  }
  private formBuildAndBind(){
    this.reviewForm = this._formBuilder.group({
      rating:[''],
      comment:['']
    });
  }
  private initPaging(){
    this._reviewService.getReviewsCount(this.productID).subscribe(
      data => {
        this.reviewsCount = data
        this.numberOfPages = Math.ceil(this.reviewsCount / this.pageSize)
        this.getSelectedPage(1);
      },
      error=>
      {
        this.errorMsg = error;
      }
    ) 
  }
  private getProductIdFromUrl(){
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.productID = parseInt(params.get('id'));

    })
  }
  private getUserReview(){
    this._reviewService.getCurrentUserReviewOnProduct(this.productID)
    .pipe(first())
    .subscribe(
      data => {
        this.currentUserReview = data;
        this.hasReview = (this.currentUserReview != null) ? true : false;
      },
      error => {
        this.errorMsg = error;

      });
  }
  // dealing with cart
  addProductToCart(productId:number){
    this._cartService.addProductToCart(productId).subscribe(
      data=>{
        alert("added to cart")
      },
      error=>{
        alert("Login to add product to cart");
        this._router.navigate(['/login']);
      }
    )
  }
  addProductToWishlist(productId){
    this._wishlistService.addProductToWishlist(productId).subscribe(
      data=>{
        alert("added to wishlist")
      },
      error=>{
        alert("Login to add product to wishlist");
        this._router.navigate(['/login']);
      }
    )
  }

  // reviews
  addReview(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.reviewForm.invalid) {
        return;
      }

    this.loading = true;
    let newReview:IReview =
    {
      id:0,
      rating: this.formFields.rating.value,
      comment: this.formFields.comment.value,
      productId: this.productID
    };
    this._reviewService.addNewReview(newReview)
        .pipe(first())
        .subscribe(
            data => {
              this.getSelectedPage(1);
              this.loading = false;
              this.resetFields();
              this.currentUserReview = data;
              this.hasReview = true;
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  // pagination
  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber:number){
    this._reviewService.getReviewsByPage(this.productID,this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allReviews = data
        this.currentPageNumber = currentPageNumber;
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }
  private resetFields():void{
    this.reviewForm.setValue({
      rating: ['1'],
      comment: ['']
    });
  }
}
