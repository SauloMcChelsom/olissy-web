
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientOrderDetailAlterRoute } from './client-order-detail-alter.route';
import { ClientOrderDetailAlterComponent } from './client-order-detail-alter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';


@NgModule({
  imports: [
    CommonModule,
    ClientOrderDetailAlterRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [ClientOrderDetailAlterComponent, ]

})

export class ClientOrderDetailAlterModule { }
