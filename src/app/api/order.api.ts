import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderInterface as Order } from '../interfaces/order.interface';

@Injectable({providedIn: 'root'})
export class OrderApi {

  constructor(private http: HttpClient) { }

  public getOrderByForeignKeyUser(order: Order){
    return this.http.get<Order[]>('/')
  }

  public getOrderByUid(order: Order){
    return this.http.get<Order>('/')
  }

  public createNewOrder(order: Order){
    return this.http.post<Order>('/', null)
  }

  public delOrderByUid(order: Order){
    return this.http.delete<Order>('/')
  }

  public putOrderByUid(order: Order){
    return this.http.put<Order>('/', null)
  } 

}