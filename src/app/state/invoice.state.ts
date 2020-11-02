import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InvoiceInterface as Invoice } from '../interfaces/invoice.interface';


@Injectable({providedIn: 'root'})
export class InvoiceState {

  private readonly _invoice = new BehaviorSubject<Invoice[]>([]);

  public pullInvoice(){
    return this._invoice.value[0]
  } 

  public getInvoice(){
    return this._invoice.asObservable();
  }

  public setInvoice(invoice: Invoice[]){
    this._invoice.next(invoice)
  }

  public addInvoice(){

  } 

  public PutInvoice(){
    this._invoice.next([]);
  } 

  public delInvoice(){
    this._invoice.next([]);
  } 

}