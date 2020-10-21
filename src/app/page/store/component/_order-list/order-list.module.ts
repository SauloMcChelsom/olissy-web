import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListRoute } from './order-list.route';
import { OrderListComponent } from './order-list.component';
import { OrderPipe } from '../../../../shared/order.pipe'

@NgModule({
  imports: [
    CommonModule,
    OrderListRoute
  ],
  declarations: [ 
    OrderListComponent, OrderPipe
  ]
})
export class OrderListModule { }