import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class InvoiceListService {

  constructor(private db: AngularFirestore){}

  public getInvoiceClient(FOREIGN_KEY_CLIENT, LIMIT){
    return this.db.collection('invoice', ref => ref.where("FOREIGN_KEY_CLIENT" , "==", FOREIGN_KEY_CLIENT).orderBy("indexDay", "desc").limit(LIMIT)).valueChanges()
  }

  public getInvoiceStore(FOREIGN_KEY, LIMIT){
    return this.db.collection('invoice', ref => ref.where("FOREIGN_KEY_STORE" , "==", FOREIGN_KEY).orderBy("indexDay", "desc").limit(LIMIT)).valueChanges()
  }

  public getUser(FOREIGN_KEY){
    return this.db.collection('user', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

}
