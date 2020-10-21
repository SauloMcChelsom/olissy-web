import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { Client, ClientService } from '../../../../service/client.service';
import { OrderShared }  from'../../../../shared/order.shared';
import { Order, OrderService } from '../../../../service/order.service';

declare var $ :any

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})

export class HeaderClientComponent {

  private unsubscribe$ = new Subject();

  public orderCreate$: Observable<Order[]> = this.orderService.getOrderInState('create') 

  public orderUser$: Observable<Order[]>   = this.orderService.getOrderInState('user')

  public client = { imageIconUrl : "/assets/img/avatar.png"}

  public router = this.route.url

  public clientOrderDetailAlter:Boolean = false

  constructor(
    private view:View,
    private userService:UserService, 
    private clientService:ClientService, 
    private orderShared:OrderShared,
    private orderService:OrderService,
    private route: Router
  ){ 
    this.route.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event:Event) => {
      if(event instanceof NavigationStart) {
        this.router = event.url
        this.getClientOrderDetailAlter()
      }
    })
  }

  public ngOnInit(){
    this.getScreen()
    this.getOrderUser()
    this.getOrderInLocalStorage()
    this.getClientOrderDetailAlter()

  } 

  public getClientOrderDetailAlter(){
    if(this.router.substring(0,26) == '/client-order-detail-alter'){
      this.clientOrderDetailAlter = true
    }else{
     this.clientOrderDetailAlter = false
    }
  }

  public getOrderInLocalStorage(){
    this.orderCreate$.pipe(takeUntil(this.unsubscribe$)).subscribe((order)=>{
      if(Object.keys(order).length == 0){
        this.orderService.setOrderInState(JSON.parse(localStorage.getItem('order')), 'create')
      }
    })
  }

  public getOrderUser(){
    let order = this.orderService.order
    order.FOREIGN_KEY_CLIENT = this.clientService.pullClientInState().PRIMARY_KEY
    this.orderUser$ = this.orderService.getOrderByForeignKeyClientInApi(order)
    
    this.orderUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((order:Order[])=>{
      this.client.imageIconUrl = this.clientService.pullClientInState().imageIconUrl
      if(Object.keys(order).length == 0){
        this.orderService.putOrderInState('user')
      }else{
        this.orderService.setOrderInState(order, 'user')
      }
    })
  }
 
  public getScreen(){
    this.orderCreate$.pipe(takeUntil(this.unsubscribe$)).subscribe((order)=>{
      if(Object.keys(order).length == 0){
        $('#displayShoppingCart').modal('hide');
      }
    })
  }

  public encreaseItem(item, index){
    this.orderShared.encreaseItem(item)
  }

  public decreaseItem(item, index){
    this.orderShared.decreaseItem(item)
  }

  public deleteItem(item, index){
    const router = this.route.url
    this.orderShared.deleteItem(item, index, router)
  }

  public Total(){
   return this.orderShared.Total()
  } 

  public sedOrder(){
    const router = this.route.url

    if(router != '/client-create-order'){
      this.view.setLoader(true)
      this.view.redirectPageFor('/client-create-order')
    }

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}