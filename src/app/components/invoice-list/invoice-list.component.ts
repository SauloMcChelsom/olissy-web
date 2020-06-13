
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InvoiceListService } from './invoice-list.service'
import { AuthService } from '../../AuthService'

@Component({
  selector: 'mt-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public loading:boolean = true

  public LIMIT:number = 10

  public FOREIGN_KEY_STORE = ""

  public invoice:any = []

  public userType = 0

  constructor(private invoiceListSService:InvoiceListService,
              private route:ActivatedRoute,
              private authService:AuthService) { }

  public ngOnInit() {
    this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
      this.getUser(isLogged.uid)
      this.FOREIGN_KEY_STORE = isLogged.uid
    })
  }

  public getUser(FOREIGN_KEY){
    this.invoiceListSService.getUser(FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((user:any)=>{
      if(user[0].userType == 2){
        this.userType = 2
        this.store(FOREIGN_KEY)
      }
      if(user[0].userType == 1){
        this.userType = 1
        this.client(FOREIGN_KEY)
      }
    })
  }

  public store(FOREIGN_KEY){
    this.invoiceListSService.getInvoiceStore(FOREIGN_KEY, this.LIMIT).pipe(takeUntil(this.unsubscribe$)).subscribe((invoice:any)=>{
      this.invoice = invoice
    })
  }

  public client(FOREIGN_KEY){
    this.invoiceListSService.getInvoiceClient(FOREIGN_KEY, this.LIMIT).pipe(takeUntil(this.unsubscribe$)).subscribe((invoice:any)=>{
      this.invoice = invoice
    })
  }

  public loadingPlusProductClient(){
    this.loading = false
    this.invoiceListSService.getInvoiceClient( this.FOREIGN_KEY_STORE, (this.LIMIT++)*5).pipe(takeUntil(this.unsubscribe$)).subscribe((invoice:any)=>{
      setTimeout(() => {
        this.invoice = invoice
        this.loading = true
      }, 1000);
    })
  }

  public loadingPlusProductStore(){
    this.loading = false
    this.invoiceListSService.getInvoiceStore( this.FOREIGN_KEY_STORE, (this.LIMIT++)*5).pipe(takeUntil(this.unsubscribe$)).subscribe((invoice:any)=>{
      setTimeout(() => {
        this.invoice = invoice
        this.loading = true
      }, 1000);
    })
  }

  public isLogged() {
    return  this.authService.isLogged()
  }

  public formatarDataTime(d){
    let data = new Date(d);
    let my = data.toLocaleString([], { hour12: true});
    return my
  }

  public ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
