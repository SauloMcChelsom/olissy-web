import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { WarehouseInterface as Warehouse } from '../interfaces/warehouse.interface';

@Injectable({providedIn: 'root'})
export class WarehouseApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getWarehouseByIndex(){
    return this.db.collection<Warehouse>('warehouse', ref =>ref.orderBy("AUTOINCREMENT", "desc").limit(5)).valueChanges()
  }

  public getWarehouseByForeignKeyUser(warehouse: Warehouse){
    return this.http.get<Warehouse[]>('/')
  }

  public getWarehouseByPrimaryKey(warehouse: Warehouse){
    return this.db.collection('warehouse', ref =>ref.where('PRIMARY_KEY', '==', warehouse.PRIMARY_KEY)).valueChanges()
  }

  public async createNewWarehouse(warehouse: Warehouse){
    warehouse.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    warehouse.DATE = new Date().toString()

    await this.db.collection('warehouse').add(warehouse).then((res: any) => warehouse.PRIMARY_KEY = res.id);
    await this.update('warehouse', warehouse.PRIMARY_KEY, { PRIMARY_KEY: warehouse.PRIMARY_KEY })
    await  this.createMongoDB(warehouse)
    await this.incrementWarehouse()

    return warehouse
  }

  public delWarehouseByUid(warehouse: Warehouse){
    return this.http.delete<Warehouse>('/')
  }

  public putWarehouseByUid(warehouse: Warehouse){
    return this.http.put<Warehouse>('/', null)
  } 

  public async sendImagemStorage(name, image){
           await firebase.storage().ref().child(name).put(image)
    return await firebase.storage().ref().child(name).getDownloadURL().then( r => r )
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public async createMongoDB(warehouse: Warehouse){
    return await this.http.post('https://olissy.herokuapp.com/product', warehouse).toPromise()
  }

  public async incrementWarehouse() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('increment').doc("00").update({ warehouse : increment })
  }

}