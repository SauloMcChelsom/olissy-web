import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderInterface as Order } from '../interfaces/order.interface';


@Injectable({providedIn: 'root'})
export class OrderState {

  private readonly _order = new BehaviorSubject<Order[]>([]);

  public pullOrder(){
    return this._order.value[0]
  } 

  public getOrder(){
    return this._order.asObservable();
  }

  public setOrder(order: Order){
    this._order.next([order])
  }

  public addOrder(){

  } 

  public PutOrder(){
    this._order.next([]);
  } 

  public delOrder(){
    this._order.next([]);
  } 

}