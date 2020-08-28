import { Injectable } from '@angular/core';
import { PaymentApi as api } from '../api/payment.api';
import { PaymentState as state } from '../state/payment.state';
import { PaymentInterface as Payment } from '../interfaces/payment.interface';
         
@Injectable({providedIn: 'root'})
export class PaymentService {

  constructor(private api: api, private state: state) {}

  public getPaymentByForeignKeyUserInApi(payment: Payment){
    return this.api.getPaymentByForeignKeyUser(payment)
  }
 
  public getPaymentByUidInApi(payment: Payment){
    return this.api.getPaymentByUid(payment)
  }

  public createNewPaymentInApi(payment: Payment){
    return this.api.createNewPayment(payment)
  }

  public putPaymentByUidInApi(payment: Payment){
    return this.api.putPaymentByUid(payment)
  }

  public delPaymentByUidInApi(payment: Payment){
    return this.api.delPaymentByUid(payment)
  }

  public pullPaymentInState(){
    return this.state.pullPayment()
  }

  public getPaymentInState(){
    return this.state.getPayment()
  }

  public setPaymentInState(payment: Payment){
    this.state.setPayment(payment)
  }

  public addPaymentInState(){
    this.state.addPayment()
  }

  public putPaymentInState(){
    return this.state.PutPayment()
  }

  public delPaymentInState(){
    return this.state.delPayment()
  }
}