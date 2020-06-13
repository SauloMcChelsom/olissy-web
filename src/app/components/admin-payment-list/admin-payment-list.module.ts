
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaymentListRoute } from './admin-payment-list.route';
import { AdminPaymentListComponent } from './admin-payment-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    AdminPaymentListRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [AdminPaymentListComponent]

})
export class AdminPaymentListModule { }
