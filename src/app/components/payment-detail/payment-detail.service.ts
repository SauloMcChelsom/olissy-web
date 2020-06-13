import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private db: AngularFirestore){}

  public getStorePayment(PRIMARY_KEY){
    return this.db.collection("storePayment", ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges()
  }
}
