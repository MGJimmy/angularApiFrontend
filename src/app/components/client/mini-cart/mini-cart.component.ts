import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IProductCartVM } from 'src/app/_models/_interfaces/IProductCartVM';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {
  productsCart: IProductCartVM[] = [];
  totalOrderPrice: number = 0;
  constructor(private _cartService: CartService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllCart();
  }

  getAllCart() {
    this._cartService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.productsCart = data
        },
        error => {
        });
  }

}
