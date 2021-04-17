import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ICategory } from 'src/app/_models/_interfaces/ICategory';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('catModelCloseBtn') catModelCloseBtn;
  allCategories:ICategory[];
  newCategory:ICategory;
  errorMsg:string;
  categoryForm : FormGroup;
  private _categoryToUpdate:ICategory;
  loading = false;
  submitted = false;
  actionName:string;

  // convenience getter for easy access to form fields
  get formFields() { return this.categoryForm.controls; }
  constructor(private _categoryService:CategoryService,
    private _formBuilder: FormBuilder,
    private _router:Router) { }

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      name:['', Validators.required]
    });
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.allCategories = data
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }
  private onAddCategorySubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
        return;
      }

    this.loading = true;
    
    this._categoryService.addNewCategory( this._categoryToUpdate)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.catModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
  private onUpdateCategorySubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
        return;
      }

    this.loading = true;
    this.newCategory = {id : 0, name : this.formFields.name.value}
    this._categoryService.updateCategory(this._categoryToUpdate.id, this._categoryToUpdate)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.catModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
  onSubmit(){
    if(this.actionName == "Add"){
      this.onAddCategorySubmit();
    }else{
      this.onUpdateCategorySubmit()
    }
  }
 


  
  openAddCategoryModal(){
    this.actionName = "Add";
  }
  openUpdateCategoryModal(categoryId){
    this.actionName = "Update";
    this._categoryService.getCategoryById(categoryId)
        .pipe(first())
        .subscribe(
            data => {
                this.categoryForm.setValue({
                  name: data.name
                }); 
                this._categoryToUpdate = data
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
}


// this.registerForm.setValue({
//      userName:'ITI',
//      password:'123',
//      confirmPassword:'123',
//      address:{
//        state:'USA',
//        city:'OHIO',
//        postalCode:'32146'
//      })