import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AdminPaymentListService {

  constructor(private db: AngularFirestore){}

  public getStorePayment(PRIMARY_KEY_ADMIN_PAYMENT){
    return this.db.collection('storePayment', ref => ref.where("PRIMARY_KEY_ADMIN_PAYMENT", "==", PRIMARY_KEY_ADMIN_PAYMENT).limit(10)).valueChanges()
  }

}
  
