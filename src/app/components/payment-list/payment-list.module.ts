
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListRoute } from './payment-list.route';
import { PaymentListComponent } from './payment-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    PaymentListRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [PaymentListComponent]

})

export class PaymentListModule { }
