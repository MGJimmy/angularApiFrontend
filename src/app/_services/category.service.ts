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

  constructor(private _http:HttpClient) { }
  getAllCategories():Observable<ICategory[]> {
    let url =  `${environment.apiUrl}/api/category`
    return this._http.get<ICategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}