
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListRoute } from './invoice-list.route';
import { InvoiceListComponent } from './invoice-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { invoicePipe } from '../../../../shared/invoice.pipe'
@NgModule({
  imports: [
    CommonModule,
    InvoiceListRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [InvoiceListComponent, invoicePipe]
})

export class InvoiceListModule {}
