import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { StoreInterface as Store } from '../interfaces/store.interface';

@Injectable({providedIn: 'root'})
export class StoreApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getStoreByForeignKeyUser(store: Store){
    return this.db.collection('store', ref =>ref.where('FOREIGN_KEY_USER', '==', store.FOREIGN_KEY_USER)).valueChanges()
  }

  public getStoreByPrimaryKey(store: Store){
    return this.db.collection('store').doc(store.PRIMARY_KEY).get()
  }
  
  public async createNewStore(store: Store){
    store.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    store.DATE = new Date().toString()

    await this.db.collection('store').add(store).then((res: any) => store.PRIMARY_KEY = res.id);
    await this.update('store', store.PRIMARY_KEY, { PRIMARY_KEY: store.PRIMARY_KEY })

    return store
  }

  public delStoreByUid(store: Store){
    return this.http.delete<Store>('/')
  }

  public putStoreByUid(store: Store){
    return this.http.put<Store>('/', null)
  } 

  public async sendImagemStorage(name, image){
    await firebase.storage().ref().child(name).put(image)
    return await firebase.storage().ref().child(name).getDownloadURL().then( r => r )
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

}