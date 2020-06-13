import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceListRoute } from './invoice-list.route';
import { InvoiceListComponent }  from './invoice-list.component';

@NgModule({
  imports: [
    CommonModule,
    InvoiceListRoute,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InvoiceListComponent
  ]
})

export class InvoiceListModule { }
