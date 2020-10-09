import { Injectable } from '@angular/core';
import { OrderApi as api } from '../api/order.api';
import { OrderState as state } from '../state/order.state';
import { OrderInterface as Order } from '../interfaces/order.interface';
export { Order }
@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private api: api, private state: state) {}

  public getOrderByForeignKeyUserInApi(order: Order){
    return this.api.getOrderByForeignKeyUser(order)
  }

  public getOrderByForeignKeyClientInApi(order: Order){
    return this.api.getOrderByForeignKeyClient(order)
  }
 
  public getOrderByUidInApi(order: Order){
    return this.api.getOrderByUid(order)
  }

  public createNewOrderInApi(order: Order){
    return this.api.createNewOrder(order)
  }

  public putOrderByUidInApi(order: Order){
    return this.api.putOrderByUid(order)
  }

  public delOrderByUidInApi(order: Order){
    return this.api.delOrderByUid(order)
  }

  public pullOrderInState(enty){
    return this.state.pullOrder(enty)
  }

  public getOrderInState(enty:string){
    return this.state.getOrder(enty)
  }

  public setOrderInState(order: Order[], enty:string){
    this.state.setOrder(order, enty)
  }

  public addOrderInState(enty:string){
    this.state.addOrder(enty)
  }

  public putOrderInState(enty:string){
    return this.state.PutOrder(enty)
  }

  public delOrderInState(enty:string){
    return this.state.delOrder(enty)
  }

  public get order():Order{
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
