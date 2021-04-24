import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IOrderDetails } from 'src/app/_models/_interfaces/IOrderDetails';
import { IProductCartDetails } from 'src/app/_models/_interfaces/IProductCartDetails';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private _orderService:OrderService) { }
  totalOrderPrice:number;
  quantites:number[]=[];
  orderDetails:IOrderDetails={productCartDetails:[],totalOrderPrice:0};
  productsCartDetails:IProductCartDetails[]=[];
  ngOnInit(): void {
    this.totalOrderPrice= parseInt( sessionStorage.getItem("totalOrderPrice"))
    this.orderDetails.totalOrderPrice=this.totalOrderPrice;
  }
  checkOut(){
   this.productsCartDetails =  JSON.parse(sessionStorage.getItem("productsCartDetails"))
   this.orderDetails = {totalOrderPrice:this.totalOrderPrice,productCartDetails:this.productsCartDetails};
   this._orderService.makeOrder(this.orderDetails)
        .pipe(first())
        .subscribe(
            data => {
               
            },
            error => {
             
            });

  }

}
