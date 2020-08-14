import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface as Product } from '../interfaces/product.interface';


@Injectable({providedIn: 'root'})
export class ProductState {

  private readonly _product = new BehaviorSubject<any[]>([]);

  public pullProduct(){
    return this._product.value[0]
  } 

  public getProduct(){
    return this._product.asObservable();
  }

  public setProduct(product: Product){
    this._product.next([product])
  }

  public addProduct(){

  } 

  public PutProduct(){
    this._product.next([]);
  } 

  public delProduct(){
    this._product.next([]);
  } 

}