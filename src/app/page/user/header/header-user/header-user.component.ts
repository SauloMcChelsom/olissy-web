import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event  } from '@angular/router';
import { View } from '../../../../shared/view.shared';
import { OrderShared }  from'../../../../shared/order.shared';
import { Order, OrderService } from '../../../../service/order.service';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var $ :any

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})

export class HeaderUserComponent implements OnInit{

  private unsubscribe$ = new Subject();

  public orderCreate$: Observable<Order[]> = this.orderService.getOrderInState('create') 

  public router = this.route.url

  constructor(
    private view:View,
    private orderShared:OrderShared,
    private orderService:OrderService,
    private route: Router
  ){
    this.route.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event:Event) => {
      if(event instanceof NavigationStart) {
        this.router = event.url
      }
    })
  } 

  public ngOnInit(){
    this.getScreen()
    this.getOrderInLocalStorage()
  }

  public getOrderInLocalStorage(){
    this.orderCreate$.pipe(takeUntil(this.unsubscribe$)).subscribe((order)=>{
      if(Object.keys(order).length == 0){
        this.orderService.setOrderInState(JSON.parse(localStorage.getItem('order')), 'create')
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

    if(router != '/user-create-order'){
      this.view.setLoader(true)
      this.view.redirectPageFor('/user-create-order')
    }

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
