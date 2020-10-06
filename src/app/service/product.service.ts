import { Injectable } from '@angular/core';
import { ProductApi as api } from '../api/product.api';
import { ProductState as state } from '../state/product.state';
import { ProductInterface as Product } from '../interfaces/product.interface';
export { Product}
         
@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private api: api, private state: state) {}

  public getProductByIndexInApi(){
    return this.api.getProductByIndex()
  }

  public getProductByForeignKeyWarehouseInApi(product: Product){
    return this.api.getProductByForeignKeyWarehouse(product)
  }

  public getProductByForeignKeyUserInApi(product: Product){
    return this.api.getProductByForeignKeyUser(product)
  }
 
  public getProductByUidInApi(product: Product){
    return this.api.getProductByUid(product)
  }

  public createNewProductInApi(product: Product){
    return this.api.createNewProduct(product)
  }

  public putProductByUidInApi(product: Product){
    return this.api.putProductByUid(product)
  }

  public delProductByUidInApi(product: Product){
    return this.api.delProductByUid(product)
  }

  public pullProductInState(){
    return this.state.pullProduct()
  }

  public getProductInState(){
    return this.state.getProduct()
  }

  public setProductInState(product: Product){
    this.state.setProduct(product)
  }

  public addProductInState(){
    this.state.addProduct()
  }

  public putProductInState(){
    return this.state.PutProduct()
  }

  public delProductInState(){
    return this.state.delProduct()
  }

  public product():Product{
    return {
      AUTOINCREMENT: '',
      DATE: '',
      FOREIGN_KEY_STORE: '',
      FOREIGN_KEY_USER: '',
      FOREIGN_KEY_WAREHOUSE: '',
      PRIMARY_KEY: '',
      price: '',
      productForSale: false,
      quantities: 0,
      totalOfComment: 0,
      totalOfLove: 0,
      totalOfSale: 0,
    }
  }
}