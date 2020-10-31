
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceDetailRoute } from './invoice-detail.route';
import { InvoiceDetailComponent } from './invoice-detail.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    InvoiceDetailRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [InvoiceDetailComponent]
})

export class InvoiceDetailModule {}
