import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { ProductInterface as Product } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getProductByIndex(){
    return this.db.collection<Product>('product', ref =>ref.orderBy("AUTOINCREMENT", "desc").limit(5)).valueChanges()
  }

  public getProductByForeignKeyUser(product: Product){
    return this.http.get<Product[]>('/')
  }

  public getProductByForeignKeyWarehouse(product: Product){
    return this.db.collection('product', ref =>ref.where('FOREIGN_KEY_WAREHOUSE', '==', product.FOREIGN_KEY_WAREHOUSE)).valueChanges()
  }

  public getProductByUid(product: Product){
    return this.db.collection<Product>('product', ref =>ref.where('PRIMARY_KEY', '==', product.PRIMARY_KEY)).valueChanges()
  }

  public async createNewProduct(product: Product){
    product.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    product.DATE = new Date().toString()

    console.log(product)

    await this.db.collection('product').add(product).then((res: any) => product.PRIMARY_KEY = res.id);
    await this.update('product', product.PRIMARY_KEY, { PRIMARY_KEY: product.PRIMARY_KEY })
    await this.increment()
    return product
  }

  public delProductByUid(product: Product){
    return this.http.delete<Product>('/')
  }

  public putProductByUid(product: Product){
    return this.http.put<Product>('/', null)
  } 

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public async increment() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('increment').doc("00").update({ product : increment })
  }

}