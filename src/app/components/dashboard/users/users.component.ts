import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from 'src/app/_models/_interfaces/IUser';
import { RegisterService } from 'src/app/_services/register.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allUsers:IUser[]; 
  errorMsg:string;
  // userForm : FormGroup;
  loading = false;
  submitted = false;
  usersCount:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages:number; // productsCount / pageSize
  constructor(private _registerService:RegisterService) { }

  ngOnInit(): void {
    this._registerService.getAccountsCount().subscribe(
      data => {
        this.usersCount = data
        this.numberOfPages = Math.ceil(this.usersCount / this.pageSize)
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
    this.getSelectedPage(1);
  }

   // pagination
  counter(i: number) {
    return new Array(i);
  }

  getSelectedPage(currentPageNumber:number){
    this._registerService.getAccountsByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allUsers = data
        this.currentPageNumber = currentPageNumber;
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }

}
