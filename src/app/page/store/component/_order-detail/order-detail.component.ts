import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subject, Observable } from 'rxjs';
import { OrderService, Order } from '../../../../service/order.service';
import { ProductService } from '../../../../service/product.service';
import { StoreService } from '../../../../service/store.service';
import { InvoiceService } from '../../../../service/invoice.service';
import { View } from '../../../../shared/view.shared';
import { Money }  from'../../../../shared/money.shared';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';


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
    private product:ProductService,
    private store:StoreService,
    private route:ActivatedRoute,
    private invoice:InvoiceService,
    private money:Money,
  ){
    this.view.setLoader(false)
  }

  ngOnInit() {
    window.scroll(0,0);
    this.macarComoVisto()
  }

  public macarComoVisto(){
    this.order$.pipe(takeUntil(this.unsubscribe$)).subscribe((order)=>{
      if(Object.keys(order).length != 0){
        if(this.order.pullOrderInState('user').storeViewedTheOrder == false){
          this.order.putOrderByForeignKeyClientInApi(this.order.pullOrderInState('user').PRIMARY_KEY, {storeViewedTheOrder: true})
        }
      }
    })

  }
  

  public accept(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'accept'})
  }
  
  public pending(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'pending'})
  }

  public packaging(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'packaging'})
  }

  public delivering(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'delivering'})
  }

  public realized(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'realized'})
  }

  public refused(PRIMARY_KEY){
    this.order.putOrderByForeignKeyClientInApi(PRIMARY_KEY, {orderState: 'refused'})
  }

  public async finished(order){
    this.view.setLoader(true)

    let store = this.store.store
        store.PRIMARY_KEY = order.FOREIGN_KEY_STORE
        await this.store.updateTotalOfSaleInApi(store)

    let product = this.product.product
    for (const key in order.product) {
      product.PRIMARY_KEY = order.product[key].FOREIGN_KEY_PRODUCT
      product.totalOfSale = order.product[key].quantity
      await this.product.updateTotalOfSaleInApi(product)
    }

    await this.invoice.createNewInvoiceInApi(order)

    await this.order.delOrderByUidInApi(order)

    await this.view.redirectPageFor('/store-order-list')
    
  }

  public async cancel(order){
    this.view.setLoader(true)

    let product = this.product.product
    for (const key in order.product) {
      product.PRIMARY_KEY = order.product[key].FOREIGN_KEY_PRODUCT
      product.quantities = order.product[key].quantity
      await this.product.updateQuantitiesInApi(product)
    }

    await this.order.delOrderByUidInApi(order)

    await this.view.redirectPageFor('/store-order-list')
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