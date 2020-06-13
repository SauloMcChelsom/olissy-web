
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailRoute } from './order-detail.route';
import { OrderDetailComponent } from './order-detail.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    OrderDetailRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [OrderDetailComponent]

})

export class OrderDetailModule { }
