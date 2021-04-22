import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newArrivalsProducts:IProduct[];
  errorMsg:string;
  constructor( private _productService:ProductService) { }
  
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
    this._productService.getNewArrivalsProducts(4).subscribe(
      data => {
        this.newArrivalsProducts = data
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
}
