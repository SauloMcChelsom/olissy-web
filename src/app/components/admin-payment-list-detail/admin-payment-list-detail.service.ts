import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AdminPaymentListDetailService {

  constructor(private db: AngularFirestore){} 

  public getStorePayment(PRIMARY_KEY){
    return this.db.collection('storePayment', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY).limit(1)).valueChanges()
  }

  public async AddRegisterPayment(PRIMARY_KEY){
    return await this.db.collection('storePayment').doc(PRIMARY_KEY).update({statusPayment:"receivedPayment"})
  }

  public async AddStatusPayment(PRIMARY_KEY){
    return await this.db.collection('storeListStatePayment').doc(PRIMARY_KEY).update({statusPayment:"receivedPayment"})
  }

  public getByPRIMARY_KEY_ADMIN_PAYMENT(FOREIGN_KEY_STORE, PRIMARY_KEY_ADMIN_PAYMENT) {
    return this.db.collection('storeListStatePayment', ref =>ref.where('FOREIGN_KEY_STORE', '==', FOREIGN_KEY_STORE)
                                                                .where('PRIMARY_KEY_ADMIN_PAYMENT', '==', PRIMARY_KEY_ADMIN_PAYMENT)).valueChanges();
  }
}
