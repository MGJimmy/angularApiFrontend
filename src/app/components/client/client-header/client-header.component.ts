import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {
  openSearch:boolean = false;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  openSearchBar(){
    this.openSearch = true;
  }
  closeSearchBar(){
    this.openSearch = false;
  }
  goToSearchPage(searchKey){
    this._router.navigate([`/search-results/${searchKey}`])
  }

}
