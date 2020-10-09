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

  public order$: Observable<Order[]> = this.order.getOrderInState('user')

  constructor( 
    private view:View,
    private order: OrderService
  ){
    this.view.setLoader(false)
  }
}
