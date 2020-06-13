
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaymentRoute } from './admin-payment.route';
import { AdminPaymentComponent } from './admin-payment.component'
import { AdminPaymentPipe } from './admin-payment.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    AdminPaymentRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [AdminPaymentComponent, AdminPaymentPipe]

})

export class AdminPaymentModule { }
