import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientOrderRoute } from './client-order.route';
import { ClientOrderComponent } from './client-order.component';
import { ClientOrderPipe } from './client-order.pipe'
@NgModule({
  imports: [
    CommonModule,
    ClientOrderRoute,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    ClientOrderComponent, ClientOrderPipe
  ]
})
export class ClientOrderModule { }
