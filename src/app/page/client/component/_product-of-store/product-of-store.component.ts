import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { OrderShared }  from'../../../../shared/order.shared';
import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';
import { Order, OrderService } from '../../../../service/order.service';

@Component({
  selector: 'mt-product-of-store',
  templateUrl: './product-of-store.component.html',
  styleUrls: ['./product-of-store.component.css']
})

export class ProductOfStoreComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public imgbackground = './assets/background.jpg'

  public order:Order = this.orderService.order()

  public warehouse:Warehouse = this.warehouseService.warehouse()
  
  public store:Store = this.storeService.store()

  public warehouses = []

  public products = []
  
  constructor(
    private view:View,
    private clientService:ClientService,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
    private orderService:OrderService,
    private route: ActivatedRoute,
    private orderShared:OrderShared,
  ){}

  public ngOnInit() {
    this.orderShared.deleteOrder()
    this.view.putLoader()
    this.getProduct()
    this.getStore()
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

  public getStore(){
    this.store.PRIMARY_KEY = this.route.parent.snapshot.params.id
    this.storeService.getStoreByPrimaryKeyInApi(this.store).pipe(takeUntil(this.unsubscribe$), take(1)).subscribe( (store:Store[]) =>{
      this.order.nameOfStore = store[0].name
      this.order.FOREIGN_KEY_STORE =  store[0].PRIMARY_KEY
      this.order.imageIconUrlOfStore =  store[0].imageIconUrl
      this.order.cellPhoneOfStore = store[0].cellPhone
      this.order.emailOfStore = store[0].email
      this.order.cityOfStore =  store[0].city
      this.order.neighborhoodOfStore =  store[0].neighborhood
      this.order.streetOfStore =  store[0].street
      this.order.cnpjOfStore =  store[0].cnpj
      this.order.taxaDeliverySelectByClientStatus = null
      this.order.methodPayment = null
      this.order.totalOrderValue = 0
    })
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
