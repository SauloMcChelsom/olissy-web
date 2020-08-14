import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvoiceInterface as Invoice } from '../interfaces/invoice.interface';

@Injectable({providedIn: 'root'})
export class InvoiceApi {

  constructor(private http: HttpClient) { }

  public getInvoiceByForeignKeyUser(invoice: Invoice){
    return this.http.get<Invoice[]>('/')
  }

  public getInvoiceByUid(invoice: Invoice){
    return this.http.get<Invoice>('/')
  }

  public createNewInvoice(invoice: Invoice){
    return this.http.post<Invoice>('/', null)
  }

  public delInvoiceByUid(invoice: Invoice){
    return this.http.delete<Invoice>('/')
  }

  public putInvoiceByUid(invoice: Invoice){
    return this.http.put<Invoice>('/', null)
  } 

}