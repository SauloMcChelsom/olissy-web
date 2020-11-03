import { Component, OnInit } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';

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
  ){}

  public ngOnInit() {
    this.view.setLoader(false)
    this.getProduct()
  }

  public  getProduct() {
     this.productService.getProductByIndexInApi().pipe(takeUntil(this.unsubscribe$)).subscribe(async(product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        let store:Store = this.storeService.store
            store.PRIMARY_KEY = product[index].FOREIGN_KEY_STORE
        await this.getStore(store)
  
        let warehouse:Warehouse = this.warehouseService.warehouse
        warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        await this.getWarehouse(warehouse)
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

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
