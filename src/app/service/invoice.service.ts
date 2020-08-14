import { Injectable } from '@angular/core';
import { InvoiceApi as api } from '../api/invoice.api';
import { InvoiceState as state } from '../state/invoice.state';
import { InvoiceInterface as Invoice } from '../interfaces/invoice.interface';
         
@Injectable({providedIn: 'root'})
export class InvoiceService {

  constructor(private api: api, private state: state) {}

  public getInvoiceByForeignKeyUserInApi(invoice: Invoice){
    return this.api.getInvoiceByForeignKeyUser(invoice)
  }
 
  public getInvoiceByUidInApi(invoice: Invoice){
    return this.api.getInvoiceByUid(invoice)
  }

  public createNewInvoiceInApi(invoice: Invoice){
    return this.api.createNewInvoice(invoice)
  }

  public putInvoiceByUidInApi(invoice: Invoice){
    return this.api.putInvoiceByUid(invoice)
  }

  public delInvoiceByUidInApi(invoice: Invoice){
    return this.api.delInvoiceByUid(invoice)
  }

  public pullInvoiceInState(){
    return this.state.pullInvoice()
  }

  public getInvoiceInState(){
    return this.state.getInvoice()
  }

  public setInvoiceInState(invoice: Invoice){
    this.state.setInvoice(invoice)
  }

  public addInvoiceInState(){
    this.state.addInvoice()
  }

  public PutInvoiceInState(){
    return this.state.PutInvoice()
  }

  public delInvoiceInState(){
    return this.state.delInvoice()
  }
}