import { Component, OnInit } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';

@Component({
  selector: 'mt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

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
    this.view.putLoader()
    this.getProduct()
  }

  public getProduct() {
     this.productService.getProductByIndexInApi().subscribe((product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        this.storeService.store.PRIMARY_KEY = product[index].FOREIGN_KEY_STORE
        this.getStore(this.storeService.store)
  
        this.warehouseService.warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        this.getWarehouse(this.warehouseService.warehouse)
      }
    })
  }

  public getStore(store:Store){
    let getStore:boolean = true
    for (const i in this.stores) {//listar todas lojas no array de this.stores
      if(this.stores[i].PRIMARY_KEY == store.PRIMARY_KEY){//tenho a loja no array de this.stores
        getStore = false//nao buscar no banco de dados
      }
      break
    }
    if(getStore){
      this.storeService.getStoreByPrimaryKeyInApi(store).subscribe((doc:any)=>{
        this.stores.push(doc.data())
      })
    }
  }

  public getWarehouse(warehouse:Warehouse){
    let getWarehouse:boolean = true
    for (const i in this.warehouses) {
      if(this.warehouses[i].PRIMARY_KEY == warehouse.PRIMARY_KEY){
        getWarehouse = false
      }
      break
    }
    if(getWarehouse){
      this.warehouseService.getWarehouseByPrimaryKeyInApi(warehouse).subscribe((doc:any)=>{
        let wh = doc.data()
        wh.showDescription = false
        this.warehouses.push(wh) 
      })
    }
  }

  public showDescription(value,index){
    this.warehouses[index].showDescription = !value
  }

}
