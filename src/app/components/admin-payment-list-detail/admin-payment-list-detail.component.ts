import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AdminPaymentListDetailService } from './admin-payment-list-detail.service'

@Component({
  selector: 'app-admin-payment-list-detail',
  templateUrl: './admin-payment-list-detail.component.html',
  styleUrls: ['./admin-payment-list-detail.component.css']
})
export class AdminPaymentListDetailComponent implements OnInit {
  
  public paymentDetail =   {
    PRIMARY_KEY:"",
    statusPayment:"",
    storeName :"",
    imageUrlStore:"",
    openPaymentDay:"",
    PRIMARY_KEY_ADMIN_PAYMENT:"",
    FOREIGN_KEY_STORE:"",
    inPaymentDay:"",
    receivedPaymentDay:"",
    latePaymentDay:"",
    totalPayment:"0.00",
    storeCity :"",
    storeStreet :"",
    storeNeighborhood :"",
    storeCellPhone :"",
    storeEmail :"",
    plataformaName :"olissy",
    plataformaCity :"vitoria",
    bank:"Bradesco",
    agency:"0005-13",
    account:"210393029",
    plataformaStreet :"av. princesa isabel",
    plataformaNeighborhood :"praia da costa",
    plataformaCellPhone :"27 33629009",
    plataformaEmail :"contato@olissy.com",
    client:[
      {
        PRIMARY_KEY:"",
        data:"",
        name: "",
        price:"0.00"
      }
    ]
  }

  public url:String = "/"

  public listOrderClient = {
    start:0,
    totalOfOrders:0,
    orders:[]
  }

  constructor(private route:ActivatedRoute, private adminPaymentListDetailService:AdminPaymentListDetailService) { 
    this.url = this.route.snapshot.params['id']
  }

  ngOnInit() {
    if(this.url != "/"){
      this.adminPaymentListDetailService.getStorePayment(this.url).subscribe((store:any)=>{
        this.paymentDetail = store[0]
        this.listOrderClient.totalOfOrders = this.paymentDetail.client.length
        this.showMoreOrders()
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

  public registerPayment(){
    this.adminPaymentListDetailService.AddRegisterPayment(this.paymentDetail.PRIMARY_KEY)
    this.adminPaymentListDetailService.getByPRIMARY_KEY_ADMIN_PAYMENT(this.paymentDetail.FOREIGN_KEY_STORE, this.paymentDetail.PRIMARY_KEY_ADMIN_PAYMENT).subscribe((res:any)=>{
      console.log(res[0])
      this.adminPaymentListDetailService.AddStatusPayment(res[0].PRIMARY_KEY)
    })
  }

}