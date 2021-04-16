import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/_models/_interfaces/ICategory';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public _allCategories:ICategory[];
  public _errorMsg:string;
  constructor(private _categoryService:CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this._allCategories = data
      },
      error=>
      {
       this._errorMsg = error;
      }
    )
  }
}
