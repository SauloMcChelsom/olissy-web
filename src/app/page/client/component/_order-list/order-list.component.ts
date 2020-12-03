import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService, Order } from '../../../../service/order.service';
import { View } from '../../../../shared/view.shared';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent {

  //public order$: Observable<Order[]> = this.order.getOrderInState('user')
  public order$: Observable<Order[]>  | any  =  (this.order.getOrderInState('user') ? this.order.getOrderInState('user') : false)

  constructor( 
    private view:View,
    private order: OrderService
  ){
    window.scroll(0,0);
    this.view.setLoader(false)
  }
}
