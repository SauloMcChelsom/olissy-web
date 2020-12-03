
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { Store, StoreService } from '../../../../service/store.service';
import { OrderShared }  from'../../../../shared/order.shared';
import { Order, OrderService } from '../../../../service/order.service';


@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.css']
})

export class HeaderStoreComponent {

  private unsubscribe$ = new Subject();

  public orderUser$: Observable<Order[]>  | any  =  (this.orderService.getOrderInState('user') ? this.orderService.getOrderInState('user') : false)
  //public orderUser$: Observable<Order[]> = this.orderService.getOrderInState('user')

  public store = { imageIconUrl : "/assets/img/avatar.png"}

  constructor(
    private view:View,
    private userService:UserService, 
    private storeService:StoreService, 
    private orderShared:OrderShared,
    private orderService:OrderService,
    private route: Router
  ){}

  public ngOnInit(){
    this.getOrderUser()
  } 
  public getOrderUser(){
    let order = this.orderService.order
    order.FOREIGN_KEY_STORE = this.storeService.pullStoreInState().PRIMARY_KEY

    this.orderUser$ = this.orderService.getOrderByForeignKeyStoreInApi(order)
    
    this.orderUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((order:Order[])=>{
      this.store.imageIconUrl = this.storeService.pullStoreInState().imageIconUrl
      if(Object.keys(order).length == 0){
        this.orderService.putOrderInState('user')
      }else{
        this.orderService.setOrderInState(order, 'user')
      }
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}