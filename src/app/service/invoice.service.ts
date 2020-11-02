import { Injectable } from '@angular/core';
import { InvoiceApi as api } from '../api/invoice.api';
import { InvoiceState as state } from '../state/invoice.state';
import { InvoiceInterface as Invoice } from '../interfaces/invoice.interface';
export { Invoice }
@Injectable({providedIn: 'root'})
export class InvoiceService {

  constructor(private api: api, private state: state) {}

  public getInvoiceByForeignKeyUserInApi(invoice: Invoice){
    return this.api.getInvoiceByForeignKeyUser(invoice)
  }
 
  public getInvoiceByUidInApi(invoice: Invoice){
    return this.api.getInvoiceByUid(invoice)
  }

  public getInvoiceByForeignKeyClientInApi(order: Invoice){
    return this.api.getInvoiceByForeignKeyClient(order)
  }

  public getInvoiceByForeignKeyStoreInApi(order: Invoice){
    return this.api.getInvoiceByForeignKeyStore(order)
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

  public setInvoiceInState(invoice: Invoice[]){
    this.state.setInvoice(invoice)
  }

  public addInvoiceInState(){
    this.state.addInvoice()
  }

  public putInvoiceInState(){
    return this.state.PutInvoice()
  }

  public delInvoiceInState(){
    return this.state.delInvoice()
  }

  public get invoice():Invoice{
    return {
      FOREIGN_KEY_CLIENT: '',
      addressFullOfClient: '',
      nameOfClient: '',
      lastNameOfClient: '',
      imageIconUrlOfClient: '',
      emailOfClient: '',
      cellPhoneOfClient: '',
      cityOfClient: '',
      neighborhoodOfClient: '',
      streetOfClient: '',
      FOREIGN_KEY_STORE: '',
      nameOfStore: '',
      imageIconUrlOfStore: '',
      cellPhoneOfStore: '',
      emailOfStore: '',
      cityOfStore: '',
      neighborhoodOfStore: '',
      streetOfStore: '',
      cnpjOfStore: '',
      AUTOINCREMENT: '',
      DATE: '',
      PRIMARY_KEY: '',
      methodPayment: '',
      informChange: '',
      orderState: 'reserved',
      storeViewedTheOrder: false,
      totalOrderValue: 0,
      taxaOfPlatform: 0,
      product: [],
      note: [],
      taxaDeliverySelectByClientStatus:'',
      taxaDeliverySelectByClient:{
        description:'Escolha a opção', 
        value: '', 
        taxa:0,
        km:0
      }
    }
  }
}