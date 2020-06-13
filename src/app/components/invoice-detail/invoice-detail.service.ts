import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailService {

  constructor(private db: AngularFirestore){}

  public getInvoice(PRIMARY_KEY){
    return this.db.collection('invoice', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges()
  }

}
