import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'; 
import { PaymentDetailService } from './payment-detail.service'
import { AuthService  } from '../../AuthService';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  public PRIMARY_KEY_INVOICE:any = false

  public loadingPayment:boolean = true

  private unsubscribe$ = new Subject();

  public paymentDetail =   {
    PRIMARY_KEY:"",
    statusPayment:"",
    storeName :"",
    imageUrlStore:"",
    openPaymentDay:"",
    inPaymentDay:"",
    receivedPaymentDay:"",
    latePaymentDay:"",
    totalPayment:"",
    storeCity :"",
    storeStreet :"",
    storeNeighborhood :"",
    storeCellPhone :"",
    storeEmail :"",
    plataformaName :"",
    plataformaCity :"",
    bank:"",
    agency:"",
    account:"",
    plataformaStreet :"",
    plataformaNeighborhood :"",
    plataformaCellPhone :"",
    plataformaEmail :"c",
    client:[]
  }

  public listOrderClient = {
    start:0,
    totalOfOrders:0,
    orders:[]
  }
  constructor(private authService: AuthService, private paymentDetailService:PaymentDetailService, private route:ActivatedRoute) {  }

  ngOnInit() {
    this.PRIMARY_KEY_INVOICE = this.route.snapshot.params['id']
    if(this.PRIMARY_KEY_INVOICE){
      this.paymentDetailService.getStorePayment(this.PRIMARY_KEY_INVOICE).subscribe((payment:any)=>{
        this.paymentDetail = payment[0]
        this.listOrderClient.totalOfOrders = this.paymentDetail.client.length
        this.showMoreOrders()
        this.loadingPayment = false
      })
    }
  }

  public formatterDateForPayment(date){
    var data = new Date(date),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        formatter = diaF+"/"+mesF+"/"+anoF;

    return formatter
  }

  public today(){
    return new Date()
  }

  public print(){
    window.print();
  }

  public showMoreOrders(){
    if(this.listOrderClient.start <= this.listOrderClient.totalOfOrders){
      this.listOrderClient.start = this.listOrderClient.start + 2
      this.listOrderClient.orders = []
      for (const key in this.paymentDetail.client) {
        if( this.listOrderClient.start >= parseInt(key) ){
          this.listOrderClient.orders.push(this.paymentDetail.client[key])
        }
      }
      if(this.listOrderClient.start >= this.listOrderClient.totalOfOrders){
        this.listOrderClient.start = this.listOrderClient.totalOfOrders - 1
      }
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
