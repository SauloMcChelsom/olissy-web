import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvoiceService, Invoice } from '../../../../service/invoice.service';
import { View } from '../../../../shared/view.shared';
import { Money }  from'../../../../shared/money.shared';

@Component({
  selector: 'mt-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  public PRIMARY_KEY = this.route.snapshot.params['id']

  public invoice$: Observable<Invoice[]> = this.invoiceService.getInvoiceInState()
  
  private unsubscribe$ = new Subject();

  constructor( 
    private view:View,
    private route:ActivatedRoute,
    private invoiceService: InvoiceService,
    private money:Money,
  ){
    window.scroll(0,0);
    this.view.setLoader(false)
  }

  ngOnInit() {
    this.getInvoice()
  }

  public getInvoice(){
    if(this.invoiceService.pullInvoiceInState() == null){
      let invoice = this.invoiceService.invoice
      invoice.PRIMARY_KEY = this.PRIMARY_KEY
      this.invoiceService.getInvoiceByUidInApi(invoice).pipe(takeUntil(this.unsubscribe$)).subscribe((invoices:Invoice[])=>{
        this.invoiceService.setInvoiceInState(invoices)
      })
    }
  }
  
  public formatDataOrder(date){
    return new Date(date).toLocaleString([], { hour12: true});
  }

  public TOTAL(invoice, taxa, delivery, taxaDeliverySelectByClient){
    if(taxaDeliverySelectByClient == 'deliveryFreeAbove'){
      const result = this.money.addition(invoice, taxa)
      return this.money.money(result)
    }
    const order_taxa =  this.money.addition(invoice, taxa)
    const result     =  this.money.addition(order_taxa, delivery) 
    return this.money.money(result)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
