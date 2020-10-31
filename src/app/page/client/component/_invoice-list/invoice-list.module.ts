
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListRoute } from './invoice-list.route';
import { InvoiceListComponent } from './invoice-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    InvoiceListRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [InvoiceListComponent]
})

export class InvoiceListModule {}
