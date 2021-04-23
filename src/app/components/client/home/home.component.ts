import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from 'src/app/_models/_interfaces/ICategory';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newArrivalsProducts:IProduct[];
  categories:ICategory[];
  errorMsg:string;
  constructor( private _productService:ProductService,private _categoryService:CategoryService,private _router:Router) { }
  
  // owl carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    stagePadding:150,
    margin:30,
    autoplayTimeout: 3000,
		autoplayHoverPause: true,
    dots: false,
    autoplay:true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        stagePadding: 100,
        items: 1 
      },
      400: {
        stagePadding: 100,
        items: 2
      },
      760: {
        stagePadding: 130,
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
    //get latest number of products
    this._productService.getNewArrivalsProducts(3).subscribe(
      data => {
        this.newArrivalsProducts = data
        console.log(this.newArrivalsProducts);
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 

    //get all categories
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data
       
      },
      error=>
      {
       this.errorMsg = error;
      }
    )

  }

  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
  public navigateToProductDetails(id:number){
    this._router.navigate(['/product-details',id])
  
  }
}
