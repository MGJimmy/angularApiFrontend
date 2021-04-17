import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { ICategory } from '../_models/_interfaces/ICategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _url =  `${environment.apiUrl}/api/category`
  constructor(private _http:HttpClient) { }

  getAllCategories():Observable<ICategory[]> {
    return this._http.get<ICategory[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCategoryById(id:number):Observable<ICategory>{
    return this._http.get<ICategory>(`${this._url}/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  addNewCategory(newCategory:ICategory):Observable<ICategory>{
    return this._http.post<ICategory>(this._url, newCategory)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  updateCategory(id:number, categoryToUpdate:ICategory):Observable<ICategory>{
    return this._http.put<ICategory>(`${this._url}/${id}`, categoryToUpdate)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }

  deleteCategory(id:number):Observable<any>{
    return this._http.delete<any>(`${this._url}/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}