import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
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

  constructor(private _route: ActivatedRoute,
     private _productServie: ProductService,
      private _spinner: NgxSpinnerService,
      private _cartService:CartService,
      private _wishlistService:WishlistService,
      private _router:Router) { }

  ngOnInit(): void {

    this._spinner.show();

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.productID = parseInt(params.get('id'));

    })

    /** spinner ends after 5 seconds */
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

  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
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





}
