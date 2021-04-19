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

  constructor(private _http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    let url = `${environment.apiUrl}/api/product`;
    return this._http.get<IProduct[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductById(id: number): Observable<IProduct> {
    let url = `${environment.apiUrl}/api/product/${id}`;
    return this._http.get<IProduct>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  addNewProduct(newProduct: IProduct): Observable<IProduct> {
    let url = `${environment.apiUrl}/api/product`;
    return this._http.post<IProduct>(url, newProduct)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  updateProduct(id: number, productToUpdate: IProduct): Observable<IProduct> {
    let url = `${environment.apiUrl}/api/product/${id}`;
    return this._http.put<IProduct>(url, productToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  deleteProduct(id: number): Observable<any> {
    let url = `${environment.apiUrl}/api/product/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductsCount(): Observable<number> {
    let url = `${environment.apiUrl}/api/product/count`;
    return this._http.get<number>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductsByPage(pageSize: number, pageNumber: number): Observable<IProduct[]> {
    let url = `${environment.apiUrl}/api/product/${pageSize}/${pageNumber}`;
    return this._http.get<IProduct[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
}
