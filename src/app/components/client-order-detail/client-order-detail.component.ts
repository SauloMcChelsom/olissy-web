import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientOrderDetailService } from './client-order-detail.service'

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.css']
})
export class ClientOrderDetailComponent implements OnInit {

  public product:any;

  public loading:boolean = true

  public loadingOrder:boolean = false

  public order:any;

  private unsubscribe$ = new Subject();

  constructor(private orderDetailService:ClientOrderDetailService,
              private route:ActivatedRoute,
              private router_navigator: Router) {}

  ngOnInit() {
    this.getOrderDetail()
  }

  public async getOrderDetail(){
    this.loadingOrder = true
    this.orderDetailService.getByOrderFOREIGN_KEY(this.route.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((order:any)=>{
      this.order = order[0]
      this.loadingOrder = false
      if(Object.keys(order).length == 0){
        this.router_navigator.navigate(['/store-order'])
      }
    })
  }

  public refused(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'abandoned'})
  }

  public abandoned(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'abandoned'})
  }

  public accept(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'reserved', storeViewedTheOrder:false})
  }

  public finished(){
    this.orderDetailService.update('order',this.order.PRIMARY_KEY, {orderState: 'finished'})
  }
 
  public formatDataOrder(date){
    return new Date(date).toLocaleString([], { hour12: true});
  }

  public calculateTotalOrder(product, taxaPlataform, TaxaDelivery){
    return Number(product) + Number(taxaPlataform) + Number(TaxaDelivery);
  }

  setProduct(product){
    this.orderDetailService.getProductDataBase(product.PRIMARY_KEY_PRODUCT_DB).subscribe((productDB:any)=>{
      this.product = productDB[0]
      setTimeout(() => {
        this.loading = false
      }, 1000);
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

