import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentInterface as Payment } from '../interfaces/payment.interface';

@Injectable({providedIn: 'root'})
export class PaymentApi {

  constructor(private http: HttpClient) { }

  public getPaymentByForeignKeyUser(payment: Payment){
    return this.http.get<Payment[]>('/')
  }

  public getPaymentByUid(payment: Payment){
    return this.http.get<Payment>('/')
  }

  public createNewPayment(payment: Payment){
    return this.http.post<Payment>('/', null)
  }

  public delPaymentByUid(payment: Payment){
    return this.http.delete<Payment>('/')
  }

  public putPaymentByUid(payment: Payment){
    return this.http.put<Payment>('/', null)
  } 

}