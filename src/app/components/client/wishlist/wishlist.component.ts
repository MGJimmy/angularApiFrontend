import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/_models/_interfaces/IProduct';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products:IProduct[] = [];
  constructor(private _wishlistService: WishlistService) { }

  ngOnInit(): void {
    this._wishlistService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.products = data
        },
        error => {
        });
  }

}
