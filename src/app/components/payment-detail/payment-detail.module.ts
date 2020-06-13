
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetailRoute } from './payment-detail.route';
import { PaymentDetailComponent } from './payment-detail.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    PaymentDetailRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [PaymentDetailComponent]

})

export class PaymentDetailModule { }
