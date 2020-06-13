import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { InvoiceDetailService } from './invoice-detail.service';


@Component({
  selector: 'mt-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})

export class InvoiceDetailComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public PRIMARY_KEY_INVOICE:any = ""

  public invoice:any = ""

  constructor(private invoiceDetailService:InvoiceDetailService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.PRIMARY_KEY_INVOICE = this.route.snapshot.params['id']
    this.getInvoice()
  }

  public getInvoice(){
    this.invoiceDetailService.getInvoice(this.PRIMARY_KEY_INVOICE).pipe(takeUntil(this.unsubscribe$)).subscribe((invoice:any)=>{
      this.invoice = invoice[0]
    })
  }

  public formatarDataTime(d){
    let data = new Date(d);
    let my = data.toLocaleString([], { hour12: true});
    //let my = data.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
    return my
  }

  public formatHours(d){
    let data = new Date(d);
    let my = data.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
    return my
  }

  public print() {
    window.print();
  }

  public calculateTotalOrder(product, taxaPlataform, TaxaDelivery){
    return Number(product) + Number(taxaPlataform) + Number(TaxaDelivery);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

