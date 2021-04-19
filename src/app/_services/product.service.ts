import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from '../_models/_interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url =  `${environment.apiUrl}/api/product`
  constructor(private _http:HttpClient) { }

  getAllProducts():Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getProductById(id:number):Observable<IProduct>{
    return this._http.get<IProduct>(`${this._url}/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  addNewProduct(newProduct:IProduct):Observable<IProduct>{
    return this._http.post<IProduct>(this._url, newProduct)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  updateProduct(id:number, productToUpdate:IProduct):Observable<IProduct>{
    return this._http.put<IProduct>(`${this._url}/${id}`, productToUpdate)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  deleteProduct(id:number):Observable<any>{
    return this._http.delete<any>(`${this._url}/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getProductsCount():Observable<number>{
    return this._http.get<number>(`${this._url}/count`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getProductsByPage(pageSize:number, pageNumber:number):Observable<IProduct[]>{
    return this._http.get<IProduct[]>(`${this._url}/${pageSize}/${pageNumber}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
