import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { IProductCartDetails } from 'src/app/_models/_interfaces/IProductCartDetails';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products:IProduct[] = [];
  totalOrderPrice:number=0;
  productsCartDetails:IProductCartDetails[]=[];
  constructor(private _cartService: CartService,private _router:Router) { }

  ngOnInit(): void {
    this._cartService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.products = data
          //initialze  array
          for (const product of this.products) {
              let productCartDetailsObj:IProductCartDetails= {
                                               productId:product.id,
                                               productDiscount:product.discount,
                                               productPrice:product.price,
                                               quantity:1
                                            }
              this.productsCartDetails.push(productCartDetailsObj)
          }
        },
        error => {
        });
  }
  quantityChanged(newQuantity,productID:number){
    var changedProduct=this.productsCartDetails.find(p=>p.productId == productID)
     let indexOfChangedProductQuantity=this.productsCartDetails.indexOf(changedProduct);
    this.productsCartDetails[indexOfChangedProductQuantity].quantity = parseInt(newQuantity);
    
  }
  computerTotalProductPrice(productID:number){
    var productCart=this.productsCartDetails.find(p=>p.productId == productID)
         return productCart.productPrice  * productCart.quantity;
  }
  computerTotalProductPriceAfterDiscount(productID:number){
        var productCart=this.productsCartDetails.find(p=>p.productId == productID)
         return (productCart.productPrice -(productCart.productPrice *(productCart.productDiscount/100)))* (productCart.quantity)
  }
  ComputeCartAndgoToCheckout(){
     for (const index in this.productsCartDetails) {
       let currentProduct=this.productsCartDetails[index]
        this.totalOrderPrice += (currentProduct.productPrice -(currentProduct.productPrice *(currentProduct.productDiscount/100)))* (currentProduct.quantity);
     }
     sessionStorage.setItem("totalOrderPrice",String (this.totalOrderPrice));
    sessionStorage.setItem("productsCartDetails",JSON.stringify(this.productsCartDetails))
      this._router.navigate(['/checkout']);
   
  }
 
}
