import { Component, OnInit } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';
import { Order, OrderService } from '../../../../service/order.service';
import { OrderShared }  from'../../../../shared/order.shared';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public order:Order = this.orderService.order

  public warehouse:Warehouse = this.warehouseService.warehouse

  public store:Store = this.storeService.store

  public imgbackground = './assets/background.jpg'

  public stores = []
  public warehouses = []
  public products = []
  public pages = 0
  public showCardBy = "product"
  
  constructor(
    private view:View,
    private clientService:ClientService,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
    private orderService:OrderService,
    private orderShared:OrderShared,
  ){}

  public ngOnInit() {
    this.view.setLoader(false)
    this.getProduct()
  }
  

  public  getProduct() {
    this.productService.getProductByIndexInApi().pipe(takeUntil(this.unsubscribe$)).subscribe(async(product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        this.store.PRIMARY_KEY = product[index].FOREIGN_KEY_STORE
        await this.getStore(this.store)
  
        this.warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        await this.getWarehouse(this.warehouse)
      }
    })
  }

  public async getStore(store:Store){
    let getStore:boolean = true
    for (const i in this.stores) {//listar todas lojas no array de this.stores
      if(this.stores[i].PRIMARY_KEY == store.PRIMARY_KEY){//tenho a loja no array de this.stores
        getStore = false//nao buscar no banco de dados
      }
      break
    }
    if(getStore){
      await this.storeService.getStoreByPrimaryKeyInApi(store).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.stores.push(v[0]) ) ).toPromise()
    }
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

  public sedOrder(product:Product){
    let warehouse:Warehouse = this.warehouses.find(warehouse => warehouse.PRIMARY_KEY == product.FOREIGN_KEY_WAREHOUSE)
    let store:Store = this.stores.find(store => store.PRIMARY_KEY == product.FOREIGN_KEY_STORE)

    this.order.nameOfStore = store.name
    this.order.imageIconUrlOfStore =  store.imageIconUrl
    this.order.cellPhoneOfStore = store.cellPhone
    this.order.emailOfStore = store.email
    this.order.cityOfStore =  store.city
    this.order.neighborhoodOfStore =  store.neighborhood
    this.order.streetOfStore =  store.street
    this.order.cnpjOfStore =  store.cnpj
    this.order.FOREIGN_KEY_STORE = product.FOREIGN_KEY_STORE
    this.order.taxaDeliverySelectByClientStatus = null
    this.order.methodPayment = null

    localStorage.setItem('order', JSON.stringify(this.order))
    this.orderService.setOrderInState(this.order)
    this.orderShared.encreaseItemCart(product, warehouse)
     
    this.view.redirectPageFor('/user-create-order')
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
