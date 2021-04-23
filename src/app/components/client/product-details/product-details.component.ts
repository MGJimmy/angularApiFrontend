import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productID:number;
  product:IProduct;
  errorMsg:string;

  constructor(private _routerActivate:ActivatedRoute,private _productServie:ProductService) { }

  ngOnInit(): void {
    //console.log("ngOnInit called")

    this._routerActivate.paramMap.subscribe((params:ParamMap)=>{
      this.productID=parseInt(params.get('id'));
  
    })

    this._productServie.getProductById(this.productID)
    .pipe(first())
    .subscribe(
        data => {
          this.product = data;
          console.log(this.product)
        },
        error => {
            this.errorMsg = error;
          
        });
        console.log("oninit called");
  }
  ngAfterViewInit(): void{
    // console.log("ngAfterViewInit called")
    // this._routerActivate.paramMap.subscribe((params:ParamMap)=>{
    //   this.productID=parseInt(params.get('id'));
  
    // })

    // this._productServie.getProductById(this.productID)
    // .pipe(first())
    // .subscribe(
    //     data => {
    //       this.product = data;
    //       console.log(this.product)
    //     },
    //     error => {
    //         this.errorMsg = error;
          
    //     });
  
  }
  test(){
    this._routerActivate.paramMap.subscribe((params:ParamMap)=>{
      this.productID=parseInt(params.get('id'));
  
    })

    this._productServie.getProductById(this.productID)
    .pipe(first())
    .subscribe(
        data => {
          this.product = data;
          console.log(this.product)
        },
        error => {
            this.errorMsg = error;
          
        });
  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit called")
  }
  

}
