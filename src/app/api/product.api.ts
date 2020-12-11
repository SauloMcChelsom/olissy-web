import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { retry,delay, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { ProductInterface as Product } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductApi {

  readonly url = `${environment.node.host}${'products/'}` ;

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public queryProductByUser(){
    return this.http.get<any>(`${this.url}query`, this.httpOptions)
    .pipe( 
     //delay(5000),
      retry(10), 
      catchError(this.handleError)
    )
  }


  public getProductByIndex(){
    return this.db.collection<Product>('product', ref =>ref.orderBy("AUTOINCREMENT", "desc").limit(5)).valueChanges()
  }

  public getProductByForeignKeyUser(product: Product){
    return this.http.get<Product[]>('/')
  }

  public getProductByForeignKeyWarehouse(product: Product){
    return this.db.collection('product', ref =>ref.where('FOREIGN_KEY_WAREHOUSE', '==', product.FOREIGN_KEY_WAREHOUSE)).valueChanges()
  }

  public getProductByForeignKeyStore(product: Product){
    return this.db.collection<Product>('product', ref =>ref.where('FOREIGN_KEY_STORE', '==', product.FOREIGN_KEY_STORE).orderBy("AUTOINCREMENT", "desc")).valueChanges()
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

  public async delProductByUid(product: Product){
    return await this.db.collection('product').doc(product.PRIMARY_KEY).delete()
  }

  public putProductByUid(product: Product){
    return this.db.collection('product').doc(product.PRIMARY_KEY).update(product);
  } 

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public async updateTotalOfSale(product: Product){
    const increment = firebase.firestore.FieldValue.increment(product.totalOfSale);
    await this.db.collection('product').doc(product.PRIMARY_KEY).update({ totalOfSale : increment })
  }

  public async updateQuantities(product: Product){
    const increment = firebase.firestore.FieldValue.increment(product.quantities);
    await this.db.collection('product').doc(product.PRIMARY_KEY).update({ quantities : increment })
  }

  public async increment() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('increment').doc("00").update({ product : increment })
  }

  // Manipulação de erros
  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  };

}