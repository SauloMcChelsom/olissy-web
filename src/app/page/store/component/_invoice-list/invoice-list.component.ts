import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { View } from '../../../../shared/view.shared';
import { InvoiceService, Invoice } from '../../../../service/invoice.service';
import { ClientService } from '../../../../service/client.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mt-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public invoice$: Observable<Invoice[]> = this.invoiceService.getInvoiceInState()

  public invoiceScreen:String = "loading"

  constructor( 
    private view:View,
    private invoiceService: InvoiceService,
    private clientService: ClientService
  ){
    window.scroll(0,0);
    this.view.setLoader(false)

    if(this.clientService.pullClientInState() != null){
      this.invoiceScreen = 'YouHaveInvoices'
    }
  }

  public ngOnInit() {
    this.getInvoice()
  }

  public getInvoice(){
    this.clientService.getClientInState().pipe(takeUntil(this.unsubscribe$)).subscribe((client)=>{
      if(Object.keys(client).length != 0){
        let invoice = this.invoiceService.invoice
        invoice.FOREIGN_KEY_CLIENT = this.clientService.pullClientInState().PRIMARY_KEY
        this.invoiceService.getInvoiceByForeignKeyClientInApi(invoice).pipe(takeUntil(this.unsubscribe$)).subscribe((invoices:Invoice[])=>{
          if(Object.keys(invoices).length != 0){
            this.invoiceScreen = 'YouHaveInvoices'
            this.invoiceService.setInvoiceInState(invoices)
          }else{
            this.invoiceScreen = 'YouHaveNoInvoices'
          }
        })
      }
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
