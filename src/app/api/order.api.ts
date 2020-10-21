import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { OrderInterface as Order } from '../interfaces/order.interface';

@Injectable({providedIn: 'root'})
export class OrderApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getOrderByForeignKeyUser(order: Order){
    return this.http.get<Order[]>('/')
  }

  public getOrderByUid(order: Order){
    return this.db.collection<Order>('order', ref =>ref.where('PRIMARY_KEY', '==', order.PRIMARY_KEY)).valueChanges()
  }

  public getOrderByForeignKeyClient(order: Order){
    return this.db.collection<Order>('order', ref =>ref.where('FOREIGN_KEY_CLIENT', '==', order.FOREIGN_KEY_CLIENT).orderBy("AUTOINCREMENT", "desc")).valueChanges()
  }

  public getOrderByForeignKeyStore(order: Order){
    return this.db.collection<Order>('order', ref =>ref.where('FOREIGN_KEY_STORE', '==', order.FOREIGN_KEY_STORE).orderBy("AUTOINCREMENT", "desc")).valueChanges()
  }

  public async createNewOrder(order: Order){
    order.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    order.DATE = new Date().toString()

    await this.db.collection('order').add(order).then((res: any) => order.PRIMARY_KEY = res.id);
    await this.update('order', order.PRIMARY_KEY, { PRIMARY_KEY: order.PRIMARY_KEY })
    return order
  }

  public async delOrderByUid(order: Order){
    return await this.db.collection('order').doc(order.PRIMARY_KEY).delete()
  }

  public putOrderByUid(order: Order){
    return this.http.put<Order>('/', null)
  } 

  public async putOrderByForeignKeyClient(PRIMARY_KEY:String, data:Object){
    await this.update('order', PRIMARY_KEY, data)
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

}