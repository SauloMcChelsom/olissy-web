import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDetailRoute } from './invoice-detail.route';
import { InvoiceDetailComponent }  from './invoice-detail.component'
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    InvoiceDetailRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    InvoiceDetailComponent
  ]
})

export class InvoiceDetailModule { }

