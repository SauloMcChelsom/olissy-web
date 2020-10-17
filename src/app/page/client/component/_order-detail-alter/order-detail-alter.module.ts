
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailAlterRoute } from './order-detail-alter.route';
import { OrderDetailAlterComponent } from './order-detail-alter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    OrderDetailAlterRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [OrderDetailAlterComponent]
})

export class OrderDetailAlterModule {}
