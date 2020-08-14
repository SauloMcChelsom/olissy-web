import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface as Product } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductApi {

  constructor(private http: HttpClient) { }

  public getProductByForeignKeyUser(product: Product){
    return this.http.get<Product[]>('/')
  }

  public getProductByUid(product: Product){
    return this.http.get<Product>('/')
  }

  public createNewProduct(product: Product){
    return this.http.post<Product>('/', null)
  }

  public delProductByUid(product: Product){
    return this.http.delete<Product>('/')
  }

  public putProductByUid(product: Product){
    return this.http.put<Product>('/', null)
  } 

}