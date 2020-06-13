import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService  } from '../../AuthService';
import { OrderDetailService } from './order-detail.service'
import { PaymentListComponent } from '../payment-list/payment-list.component'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public ID:any = "";

  public buttonRemoverPedido:boolean = true

  public userType = 0

  public product:any;

  public loading:boolean = true

  public order:any;

  private unsubscribe$ = new Subject();

  constructor(private authService: AuthService,
              private orderDetailService:OrderDetailService,
              private route:ActivatedRoute,
              private PaymentListComponent:PaymentListComponent) {

              }

  ngOnInit() {
    this.authToken()
  }

  public async authToken(){
    await this.authService.isLogged().subscribe(async(res:any)=>{
      if(res != null){
        this.ID = await res.uid
        this.getOrderDetail()
      }
    })
  }
 
  public async getOrderDetail(){
    this.orderDetailService.getByClientFOREIGN_KEY(this.ID).pipe(takeUntil(this.unsubscribe$)).subscribe((client:any)=>{
      this.userType = client[0].userType
      this.orderDetailService.getByOrderFOREIGN_KEY(this.route.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((order:any)=>{
        this.order = order[0]
        if(this.userType == 2){
          this.macarComoVisto()
          this.PaymentListComponent.ngOnInit()
        }
      })
    })
  }

  setProduct(product){
    this.orderDetailService.getProductDataBase(product.PRIMARY_KEY_PRODUCT_DB).subscribe((productDB:any)=>{
      this.product = productDB[0]
      setTimeout(() => {
        this.loading = false
      }, 1000);
    })
  }

  public formatDataOrder(d){
    let data = new Date(d);
    let my = data.toLocaleString([], { hour12: true});
    return my
  }

  public macarComoFinalizado(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'Finalizado'}).then(()=>{
      this.historyNavigateBack()
    })
  }

  public Desistir(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'Desistência'}).then(()=>{
      this.historyNavigateBack()
    })
  }

  public macarComoEmProcessamento(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'Em processamento'})
  }

  public macarComoEntregar(){ 
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'Entregando'})
  }

  public macarComoVisto(){
    if(this.order.storeViewedTheOrder == false && this.userType == 2){
      this.orderDetailService.update('order',this.order.PRIMARY_KEY, {storeViewedTheOrder: true})
    }
  }

  public async RemoverPedido(order){

    this.buttonRemoverPedido = false

    if(order.orderState == 'Desistência'){
      let productDecrement = 1
      this.orderDetailService.deleterCollectionStorage('order', this.order.PRIMARY_KEY)
      for (const key of order.product) {
        this.orderDetailService.incrementProductQuantities(key.PRIMARY_KEY, key.quantities)
        if(productDecrement >= order.product.length){
          this.historyNavigateBack()
        }
        productDecrement++
      }
    }

    if(order.orderState == 'Finalizado'){
      this.PaymentListComponent.addPayment(order.PRIMARY_KEY, order.clientName+" "+order.clientLastName, order.totalOrderValue - 0.25).then(async(res:any) => {
        if(res != null){
          delete this.order.message
          delete this.order.storeViewedTheOrder
          await this.salesIncrement().then(()=>{
            this.orderDetailService.createInvoice(this.order).then(()=>{
              this.orderDetailService.deleterCollectionStorage('order', this.order.PRIMARY_KEY).then(()=>{
                this.historyNavigateBack()
              })
            })
          })
        }
      })
    }
  }

  public async salesIncrement(){
    this.order.product.forEach((element:any) => {
      for (let i = 0; i < element.quantities; i++) {
        this.orderDetailService.updateSales(element.PRIMARY_KEY )
        this.orderDetailService.getReactionsProduct(this.order.FOREIGN_KEY_CLIENT, element.PRIMARY_KEY).subscribe((res:any)=>{
          if(res[0].clientReactionsSale == false){
            this.macarComoComprado(res[0].PRIMARY_KEY)
          }
        })
      }
    })
  }

  public macarComoComprado(PRIMARY_KEY){
    this.orderDetailService.update('reactionsProduct', PRIMARY_KEY, {clientReactionsSale: true})
  }

  public historyNavigateBack(){
    window.history.back();
  }

  public methodPaymentInPortugues(pay):string{
    if(pay == 'money'){
      return "Dinheiro"
    }
    if(pay == 'debit'){
      return "Débito"
    }
    if(pay == 'credit'){
      return "Crédito"
    }

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
