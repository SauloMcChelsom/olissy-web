import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { InvoiceInterface as Invoice } from '../interfaces/invoice.interface';

@Injectable({providedIn: 'root'})
export class InvoiceApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getInvoiceByForeignKeyUser(invoice: Invoice){
    return this.http.get<Invoice[]>('/')
  }

  public getInvoiceByUid(invoice: Invoice){
    return this.db.collection<Invoice>('invoice', ref =>ref.where('PRIMARY_KEY', '==', invoice.PRIMARY_KEY)).valueChanges()
  }

  public getInvoiceByForeignKeyClient(invoice: Invoice){
    return this.db.collection<Invoice>('invoice', ref =>ref.where('FOREIGN_KEY_CLIENT', '==', invoice.FOREIGN_KEY_CLIENT).orderBy("AUTOINCREMENT", "desc")).valueChanges()
  }

  public getInvoiceByForeignKeyStore(invoice: Invoice){
    return this.db.collection<Invoice>('invoice', ref =>ref.where('FOREIGN_KEY_STORE', '==', invoice.FOREIGN_KEY_STORE).orderBy("AUTOINCREMENT", "desc")).valueChanges()
  }

  public async createNewInvoice(invoice: Invoice){
    invoice.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    invoice.DATE = new Date().toString()

    await this.db.collection('invoice').doc(invoice.PRIMARY_KEY).set(invoice)
    return invoice
  }

  public delInvoiceByUid(invoice: Invoice){
    return this.http.delete<Invoice>('/')
  }

  public putInvoiceByUid(invoice: Invoice){
    return this.http.put<Invoice>('/', null)
  } 

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

}