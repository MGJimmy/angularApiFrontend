import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products:IProduct[] = [];
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.products = data
        },
        error => {
        });
  }
}
