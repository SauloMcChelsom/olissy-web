import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { View } from '../../../../shared/view.shared';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';
import { Order, OrderService } from '../../../../service/order.service';
import { OrderShared }  from'../../../../shared/order.shared';

@Component({
  selector: 'mt-product-of-store',
  templateUrl: './product-of-store.component.html',
  styleUrls: ['./product-of-store.component.css']
})

export class ProductOfStoreComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public imgbackground = './assets/background.jpg'

  public order:Order = this.orderService.order

  public warehouse:Warehouse = this.warehouseService.warehouse
  
  public store:Store = this.storeService.store

  public warehouses = []

  public products = []
  
  constructor(
    private view:View,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
    private orderService:OrderService,
    private route: ActivatedRoute,
    private orderShared:OrderShared,
  ){}

  public async ngOnInit() {
    this.view.putLoader()
    this.orderShared.deleteOrder()
    await this.getStore()
    this.getProduct()
  }

  public  getProduct() {
     this.productService.getProductByIndexInApi().pipe(takeUntil(this.unsubscribe$)).subscribe(async(product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        this.warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        await this.getWarehouse(this.warehouse)
      }
    })
  }

  public async getWarehouse(warehouse:Warehouse){
    let getWarehouse:boolean = true
    for (const i in this.warehouses) {
      if(this.warehouses[i].PRIMARY_KEY == warehouse.PRIMARY_KEY){
        getWarehouse = false
      }
      break
    }
    if(getWarehouse){
      let wh
      await this.warehouseService.getWarehouseByPrimaryKeyInApi(warehouse).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => wh = v[0] ) ).toPromise()
      wh.showDescription = false
      this.warehouses.push(wh)
    }
  }

  public showDescription(value,index){
    this.warehouses[index].showDescription = !value
  }

  public async getStore(){
    this.store.PRIMARY_KEY = this.route.parent.snapshot.params.id
    await this.storeService.getStoreByPrimaryKeyInApi(this.store).pipe(takeUntil(this.unsubscribe$),take(1), map((v:Store[]) => this.store = v[0]) ).toPromise()

    this.order.nameOfStore = this.store.name
    this.order.FOREIGN_KEY_STORE =  this.store.PRIMARY_KEY
    this.order.imageIconUrlOfStore =  this.store.imageIconUrl
    this.order.cellPhoneOfStore = this.store.cellPhone
    this.order.emailOfStore = this.store.email
    this.order.cityOfStore =  this.store.city
    this.order.neighborhoodOfStore =  this.store.neighborhood
    this.order.streetOfStore =  this.store.street
    this.order.cnpjOfStore =  this.store.cnpj
    this.order.taxaDeliverySelectByClientStatus = null
    this.order.methodPayment = null
    this.order.totalOrderValue = 0
  }

  public encreaseItemCart(product){
    localStorage.setItem('order', JSON.stringify(this.order))
    this.orderService.setOrderInState(this.order)
    let warehouse:Warehouse = this.warehouses.find(warehouse => warehouse.PRIMARY_KEY == product.FOREIGN_KEY_WAREHOUSE)
    this.orderShared.encreaseItemCart(product, warehouse)
  }

  public decreaseItemCart(product, index){
    this.orderShared.decreaseItemCart(product, index)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
