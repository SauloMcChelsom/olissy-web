import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListRoute } from './order-list.route';
import { OrderListComponent } from './order-list.component';
import { OrderStorePipe } from '../../../../shared/order-store.pipe' 

@NgModule({
  imports: [
    CommonModule,
    OrderListRoute
  ],
  declarations: [ 
    OrderListComponent, OrderStorePipe
  ]
})
export class OrderListModule { }