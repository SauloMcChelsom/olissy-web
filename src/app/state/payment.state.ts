import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentInterface as Payment } from '../interfaces/payment.interface';


@Injectable({providedIn: 'root'})
export class PaymentState {

  private readonly _payment = new BehaviorSubject<any[]>([]);

  public pullPayment(){
    return this._payment.value[0]
  } 

  public getPayment(){
    return this._payment.asObservable();
  }

  public setPayment(payment: Payment){
    this._payment.next([payment])
  }

  public addPayment(){

  } 

  public PutPayment(){
    this._payment.next([]);
  } 

  public delPayment(){
    this._payment.next([]);
  } 

}