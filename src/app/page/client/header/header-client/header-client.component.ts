import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { ClientService } from '../../../../service/client.service';
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

  public order$: Observable<Order[]> = this.orderService.getOrderInState() 

  public router = this.route.url

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
      }
    })
  }

  public ngOnInit(){
    this.getScreen()
  }

  public async signOut() {
    this.view.setLoader(true)
    this.userService.delUserInState()
    this.clientService.delClientInState()
    await this.userService.logoutInApi()
    this.view.setUser('user')
    this.view.redirectPageFor('/login')
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