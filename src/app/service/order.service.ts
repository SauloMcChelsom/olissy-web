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

  public pullOrderInState(){
    return this.state.pullOrder()
  }

  public getOrderInState(){
    return this.state.getOrder()
  }

  public setOrderInState(order: Order){
    this.state.setOrder(order)
  }

  public addOrderInState(){
    this.state.addOrder()
  }

  public putOrderInState(){
    return this.state.PutOrder()
  }

  public delOrderInState(){
    return this.state.delOrder()
  }

  public order():Order{
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
