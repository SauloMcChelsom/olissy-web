
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
//import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})
export class StoreOrderService {

  constructor(private db: AngularFirestore){}

  public getOrder(FOREIGN_KEY_STORE){
    return this.db.collection('order', ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE).orderBy("indexDay", "desc")).valueChanges()
  }

}
