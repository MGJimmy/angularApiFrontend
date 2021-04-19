import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  constructor(private _router:Router, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }
  navigateToCategories():void{
    this._router.navigate(['categories'],{relativeTo:this._activatedRoute});    
  }
  navigateToOrders():void{
    this._router.navigate(['orders'],{relativeTo:this._activatedRoute});    
  }
}
