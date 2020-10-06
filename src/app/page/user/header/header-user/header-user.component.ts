import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
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

  public order$: Observable<Order[]> = this.orderService.getOrderInState() 

  constructor(
    private view:View,
    private orderShared:OrderShared,
    private orderService:OrderService,
    private route: Router
  ){}

  public ngOnInit(){
    this.getScreen()
  }
 
  public getScreen(){
    this.order$.pipe(takeUntil(this.unsubscribe$)).subscribe((order)=>{
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
    const reuter = this.route.url
    this.orderShared.deleteItem(item, index, reuter)
  }

  public Total(){
   return this.orderShared.Total()
  } 

  public sedOrder(){
    this.view.setLoader(true)
    this.view.redirectPageFor('/user-create-order')
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
