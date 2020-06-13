import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreOrderModuleRoute } from './store-order.route';
import { StoreOrderPipe } from './store-order.pipe';
import { StoreOrderComponent } from './store-order.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    StoreOrderModuleRoute,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule
  ],
  declarations: [
    StoreOrderComponent, 
    StoreOrderPipe
  ]
})

export class StoreOrderModule { }
