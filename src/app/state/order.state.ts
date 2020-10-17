import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderInterface as Order } from '../interfaces/order.interface';


@Injectable({providedIn: 'root'})
export class OrderState {

  private readonly create = new BehaviorSubject<Order[]>([]);

  private readonly user = new BehaviorSubject<Order[]>([]);

  public pullOrder(enty){
    
    if(enty == 'user'){
      return this.user.value[0]
    }

    if(enty == 'create'){
      return this.create.value[0]
    }
    
  } 

  public getOrder(enty){
    if(enty == 'user'){
      return this.user.asObservable();
    }

    if(enty == 'create'){
      return this.create.asObservable();
    }
  }

  public setOrder(order: Order[], enty){

    if(order != null && enty == 'user'){
      this.user.next(order)
    }

    if(order != null && enty == 'create'){
      this.create.next(order)
    }
  }

  public addOrder(enty){

  } 

  public PutOrder(enty){
    if(enty == 'user'){
      return this.user.next([]);
    }

    if(enty == 'create'){
      this.create.next([]);
    }
  } 

  public delOrder(enty){
    if(enty == 'user'){
      return this.user.next([]);
    }

    if(enty == 'create'){
      this.create.next([]);
    }
  } 

}