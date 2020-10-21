import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subject, Observable } from 'rxjs';
import { OrderService, Order } from '../../../../service/order.service';
import { View } from '../../../../shared/view.shared';
import { Money }  from'../../../../shared/money.shared';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public PRIMARY_KEY = this.route.snapshot.params['id']

  public order$: Observable<Order[]> = this.order.getOrderInState('user')
  
  private unsubscribe$ = new Subject();

  constructor( 
    private view:View,
    private order: OrderService,
    private route:ActivatedRoute,
    private money:Money,
  ){
    this.view.setLoader(false)
  }

  ngOnInit() {
    window.scroll(0,0);
  }
  
  public refused(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'abandoned'})
  }

  public abandoned(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'abandoned'})
  }

  public accept(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'reserved', storeViewedTheOrder:false})
  }

  public finished(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'finished'})
  }
 
  public formatDataOrder(date){
    return new Date(date).toLocaleString([], { hour12: true});
  }

  public TOTAL(order, taxa, delivery, taxaDeliverySelectByClient){
    if(taxaDeliverySelectByClient == 'deliveryFreeAbove'){
      const result = this.money.addition(order, taxa)
      return this.money.money(result)
    }
    const order_taxa =  this.money.addition(order, taxa)
    const result     =  this.money.addition(order_taxa, delivery) 
    return this.money.money(result)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}