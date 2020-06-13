
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaymentListDetailRoute } from './admin-payment-list-detail.route';
import { AdminPaymentListDetailComponent } from './admin-payment-list-detail.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    AdminPaymentListDetailRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [AdminPaymentListDetailComponent]

})
export class AdminPaymentListDetailModule { }
