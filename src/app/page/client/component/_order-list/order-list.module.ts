import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { OrderListRoute } from './order-list.route';
import { OrderListComponent } from './order-list.component';
import { OrderClientPipe } from '../../../../shared/order-client.pipe' 

@NgModule({
  imports: [
    CommonModule,
    OrderListRoute
  ],
  declarations: [ 
    OrderListComponent, OrderClientPipe
  ]
})
export class OrderListModule { }