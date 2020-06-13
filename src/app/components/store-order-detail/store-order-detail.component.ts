import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreOrderDetailService } from './store-order-detail.service'
import { PaymentListComponent } from '../payment-list/payment-list.component'

@Component({
  selector: 'app-store-order-detail',
  templateUrl: './store-order-detail.component.html',
  styleUrls: ['./store-order-detail.component.css']
})
export class StoreOrderDetailComponent implements OnInit {

  public buttonRemoverPedido:boolean = true

  public loadingOrder:boolean = false

  public taxaDeliveryStatus = "accept"

  public product:any;

  public store = { PRIMARY_KEY:null }

  public loading:boolean = true

  public order:any;

  public totalOrder

  private unsubscribe$ = new Subject();

  constructor(private router_navigator: Router,
              private orderDetailService:StoreOrderDetailService,
              private route:ActivatedRoute,
              private PaymentListComponent:PaymentListComponent) {}

  ngOnInit() {
    this.getOrderDetail()
  }
 
  public async getOrderDetail(){
    this.loadingOrder = true
    this.orderDetailService.getByOrderFOREIGN_KEY(this.route.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((order:any)=>{
      this.order = order[0]
      this.loadingOrder = false
      this.macarComoVisto()
      this.clientFinishedOrder()
    })
  }

  public macarComoVisto(){
    if(this.order.storeViewedTheOrder == false){
      this.orderDetailService.update('order',this.order.PRIMARY_KEY, {storeViewedTheOrder: true})
    }
  }

  setProduct(product){
    this.orderDetailService.getProductDataBase(product.PRIMARY_KEY_PRODUCT_DB).pipe(takeUntil(this.unsubscribe$)).subscribe((productDB:any)=>{
      this.product = productDB[0]
      setTimeout(() => {
        this.loading = false
      }, 1000);
    })
  }

  public accept(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'accept'})
  }

  public pending(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'pending', taxaDelivery: this.order.taxaDelivery})
  }

  public packaging(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'packaging'})
  }

  public delivering(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'delivering'})
  }

  public realized(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'realized'})
  }
  public refused(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'refused'})
  }

  public cancel(order){
    let productDecrement = 1
    this.buttonRemoverPedido = false
    for (const key of order.product) {
      this.orderDetailService.incrementProductQuantities(key.PRIMARY_KEY, key.quantities)
      if(productDecrement >= order.product.length){
        this.orderDetailService.deleterCollectionStorage('order', this.order.PRIMARY_KEY).then((res)=>{
          this.router_navigator.navigate(['/store-order'])
        })
      }
      productDecrement++
    }
  }

  public clientFinishedOrder(){
    if(this.order.orderState == 'finished'){
      this.loadingOrder = true
      this.PaymentListComponent.ngOnInit()
      this.orderDetailService.getByStoreFOREIGN_KEY(this.order.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        this.store.PRIMARY_KEY = store[0].PRIMARY_KEY
        this.loadingOrder = false
      })
    }
  } 

  public async finished(order){
    
    this.buttonRemoverPedido = false
    
    this.orderDetailService.incrementSale(this.store.PRIMARY_KEY)
    
    this.PaymentListComponent.addPayment(order.PRIMARY_KEY, order.clientName+" "+order.clientLastName, order.totalOrderValue - 0.25).then(async(res:any) => {
      if(res != null){
        delete this.order.message
        delete this.order.storeViewedTheOrder
        await this.salesIncrement().then(()=>{
          this.orderDetailService.createInvoice(this.order).then(()=>{
            this.orderDetailService.deleterCollectionStorage('order', this.order.PRIMARY_KEY).then(()=>{
              this.router_navigator.navigate(['/store-order'])
            })
          })
        })
      }
    })
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

  public setTaxaDelivery(value){
    if(value == ""  || value == null ||  value == NaN  || value == undefined || value == false){
      this.order.taxaDelivery = 0
      this.taxaDeliveryStatus = "accept"
    }else{
      this.order.taxaDelivery = value
      this.taxaDeliveryStatus = "pending"
    }
    
  }

  public calculateTotalOrder(product, taxaPlataform, TaxaDelivery){
    return Number(product) + Number(taxaPlataform) + Number(TaxaDelivery);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}