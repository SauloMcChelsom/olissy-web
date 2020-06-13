import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteOrdersRoute } from './complete-orders.route';
import { CompleteOrdersComponent } from './complete-orders.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    CompleteOrdersRoute,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule
  ],
  declarations: [
    CompleteOrdersComponent
  ]
})

export class CompleteOrdersModule { }