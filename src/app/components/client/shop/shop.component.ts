import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { Product } from 'src/app/_models/_classes/Product';
import { ICategory } from 'src/app/_models/_interfaces/ICategory';
import { IColor } from 'src/app/_models/_interfaces/IColor';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ColorService } from 'src/app/_services/color.service';
import { ProductService } from 'src/app/_services/product.service';
import { WishlistService } from 'src/app/_services/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  errorMsg:string;
  allCategories:ICategory[];
  allColors:IColor[];
  productsPerPage:Product[];
  pageSize:number = 2;
  productsCount:number;
  currentPageNumber:number = 1;
  numberOfPages:number; // categoriesCount / pageSize
  title:string = "All products";

  selectedCategoryId:number;
  selectedCategoryName:string;
  constructor(
    private _productSevice:ProductService,
    private _categoryService:CategoryService,
    private _colorService:ColorService,
    private _cartService:CartService,
    private _wishlistService:WishlistService,
    private _route:ActivatedRoute) { 

      this._route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.selectedCategoryId = params['category'] || 0;
        this.changePagetTitle();
        this.getSelectedPage(1); 

      })
    }

  ngOnInit(): void {
    // load colors && categorys
    this._categoryService.getAllCategories().subscribe(
      data=>{
        this.allCategories = data
        console.log("all categories here");
      },
      error=>{
        this.errorMsg = error;
      }
    )
    this._colorService.getAllColors().subscribe(
      data=>{
        this.allColors = data
      },
      error=>{
        this.errorMsg = error;
      }
    )
    this._productSevice.getProductsCount().subscribe(
      data => {
        this.productsCount = data
        this.numberOfPages = Math.ceil(this.productsCount / this.pageSize)
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  
  }
  changeSelectedCategoryName(categoryName){
    this.selectedCategoryName = categoryName
  }

  getProductsForCategoryPerPage(currentPageNumber:number):void{
    this._productSevice.getProductsByCategory(this.selectedCategoryId, this.pageSize, currentPageNumber).subscribe(
      data=>{
        this.productsPerPage = data
        this.currentPageNumber = currentPageNumber;
      },
      error=>{
        this.errorMsg = error
      }
    );
  }

  getProductsPerPage(currentPageNumber:number){
    this._productSevice.getProductsByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.productsPerPage = data
        this.currentPageNumber = currentPageNumber;
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }
  changePagetTitle(){
    if(this.selectedCategoryId != 0){
      this.title = "Category: " + this.selectedCategoryName;
    }
    else{
      this.title = "All products"
    }
  }
  // dealing with cart
  addProductToCart(productId:number){
    this._cartService.addProductToCart(productId).subscribe(
      data=>{
        alert("added to cart")
      },
      error=>{
        alert("ERROR: failed to add to cart")
      }
    )
  }
  addProductToWishlist(productId){
    this._wishlistService.addProductToWishlist(productId).subscribe(
      data=>{
        alert("added to wishlist")
      },
      error=>{
        alert("ERROR: failed to add to wishlist")
      }
    )
  }

  // pagination
  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber:number){
    if(this.selectedCategoryId != 0){
      this.getProductsForCategoryPerPage(currentPageNumber);
    }else{
      this.getProductsPerPage(currentPageNumber);
    }
  }
  // image path
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
