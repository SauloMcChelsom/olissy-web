import { Injectable } from '@angular/core';
import { View } from './view.shared';
import { Money }  from'./money.shared';
import { Order, OrderService } from '../service/order.service';
import { ProductInterface as Product } from '../interfaces/product.interface';
import { WarehouseInterface as Warehouse } from '../interfaces/warehouse.interface';


@Injectable({providedIn: 'root'})
export class OrderShared {

  public order:Order = null

  constructor(
    private view:View,
    private money:Money,
    private orderService:OrderService
  ){
    this.orderService.setOrderInState(JSON.parse(localStorage.getItem('order')))
  }

  public encreaseItem(item){
    this.order = this.orderService.pullOrderInState()
    const foundProduct: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);
    
    if(foundProduct.quantity < foundProduct.quantities){
      foundProduct.quantity = this.money.addition( foundProduct.quantity , 1 )
      const a = this.money.subtract(this.order.totalOrderValue , foundProduct.totalOfPrice)
      const b = this.money.multiply(foundProduct.price , foundProduct.quantity)
      this.order.totalOrderValue = this.money.addition( a , b )
      foundProduct.totalOfPrice = this.money.multiply(foundProduct.price , foundProduct.quantity)
    }
    
    localStorage.setItem('order', JSON.stringify(this.order))
    this.orderService.setOrderInState(this.order)
    this.order = null
  }

  public decreaseItem(item){
    this.order = this.orderService.pullOrderInState()
    const foundProduct: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    if(foundProduct.quantity > 1){
      foundProduct.quantity = this.money.subtract( foundProduct.quantity , 1 )
      foundProduct.totalOfPrice =  this.money.subtract(foundProduct.totalOfPrice , foundProduct.price)
      this.order.totalOrderValue =  this.money.subtract(this.order.totalOrderValue , foundProduct.price)
    }

    localStorage.setItem('order', JSON.stringify(this.order))
    this.orderService.setOrderInState(this.order)
    this.order = null
  }

  public deleteItem(item, index, reuter='/'){
    this.order = this.orderService.pullOrderInState()
    const foundProduct: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    this.order.totalOrderValue = this.money.subtract(this.order.totalOrderValue , foundProduct.totalOfPrice)
    this.order.product.splice(index, 1)

    localStorage.setItem('order', JSON.stringify(this.order))
    this.orderService.setOrderInState(this.order)

    if(Object.keys(this.order.product).length == 0){
      this.deleteOrder()
      if(reuter == '/user-create-order' || '/client-create-order'){
        this.view.setLoader(true)

        if(reuter == '/user-create-order'){this.view.redirectPageFor('/home')}

        if(reuter == '/client-create-order'){this.view.redirectPageFor('/client-home')}
      }
    }
    this.order = null
  }

  public encreaseItemCart(product:Product, warehouse:Warehouse){
      let item = {
        FOREIGN_KEY_PRODUCT : product.PRIMARY_KEY,
        price : Number(product.price),
        totalOfPrice:Number(product.price),
        quantities:Number(product.quantities),
        name : warehouse.name,
        quantity:1
      }

      this.order = this.orderService.pullOrderInState()
      if(this.orderService.pullOrderInState() == null){
        this.order = this.orderService.order
      }
    
      const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);
  
      if(foundItem){
        if(foundItem.quantity < foundItem.quantities){
          foundItem.quantity = this.money.addition( foundItem.quantity , 1 )
          const a = this.money.subtract(this.order.totalOrderValue , foundItem.totalOfPrice)
          const b = this.money.multiply(foundItem.price , foundItem.quantity)
          this.order.totalOrderValue = this.money.addition( a , b )
          foundItem.totalOfPrice = foundItem.price * foundItem.quantity;
        }
      }else{
        this.order.totalOrderValue += item.totalOfPrice
        this.order.product.push(item)
      }

      localStorage.setItem('order', JSON.stringify(this.order))
      this.orderService.setOrderInState(this.order)
      this.order = null
    }
  
    public decreaseItemCart(product, index){
      this.order = this.orderService.pullOrderInState()
      const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === product.PRIMARY_KEY);
  
      if(foundItem.quantity > 1){
        foundItem.quantity = this.money.subtract( foundItem.quantity , 1 )
        foundItem.totalOfPrice = this.money.subtract(foundItem.totalOfPrice , foundItem.price)
        this.order.totalOrderValue =  this.money.subtract(this.order.totalOrderValue , foundItem.price)
      }else{
        this.order.totalOrderValue =  this.money.subtract(this.order.totalOrderValue , foundItem.price)
        this.order.product.splice(index, 1)
      }
  
      if(Object.keys(this.order.product).length == 0){
        this.deleteOrder()
      }else{
        localStorage.setItem('order', JSON.stringify(this.order))
        this.orderService.setOrderInState(this.order)
      }

      this.order = null
      
    }

  public Total(){
      if(this.orderService.pullOrderInState() == null){
        return 0
      }

      let order    = this.orderService.pullOrderInState().totalOrderValue
      let taxa     = this.orderService.pullOrderInState().taxaOfPlatform
      let delivery = this.orderService.pullOrderInState().taxaDeliverySelectByClient.taxa

      if(this.orderService.pullOrderInState().taxaDeliverySelectByClient.value == 'deliveryFreeAbove'){
        const result = this.money.addition(order, taxa)
        return this.money.money(result)
      }
      const order_taxa = this.money.addition(order, taxa)
      const result     =  this.money.addition(order_taxa, delivery) 
      return this.money.money(result)
  }

  public setStore(store){
    this.orderService.pullOrderInState().nameOfStore = store.name
    this.orderService.pullOrderInState().FOREIGN_KEY_STORE = store.PRIMARY_KEY
    this.orderService.pullOrderInState().imageIconUrlOfStore = store.imageIconUrl
    this.orderService.pullOrderInState().cellPhoneOfStore = store.cellPhone
    this.orderService.pullOrderInState().emailOfStore = store.email
    this.orderService.pullOrderInState().cityOfStore = store.city
    this.orderService.pullOrderInState().neighborhoodOfStore = store.neighborhood
    this.orderService.pullOrderInState().streetOfStore = store.street
    this.orderService.pullOrderInState().cnpjOfStore = store.cnpj
    this.orderService.pullOrderInState().taxaDeliverySelectByClientStatus = null
    this.orderService.pullOrderInState().methodPayment = null
    localStorage.setItem('order', JSON.stringify(this.orderService.pullOrderInState()))
  }

  public createOrder(){
    this.orderService.setOrderInState(this.orderService.order)
    localStorage.setItem('order', JSON.stringify(this.orderService.order))
  }

  public deleteOrder(){
    localStorage.removeItem('order')
    this.orderService.delOrderInState()
  }
  
} 
