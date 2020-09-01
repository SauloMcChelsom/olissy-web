import { Component, OnInit } from '@angular/core';
import { Core, Store, Product, Warehouse } from '../../../../shared/core'

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
    private core:Core
  ){}

  public ngOnInit() {
    this.getProduct()
  }

  public getProduct() {
    this.core.productService().getProductByIndexInApi().subscribe((product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        this.core.store.PRIMARY_KEY = product[index].FOREIGN_KEY_STORE
        this.getStore(this.core.store)
  
        this.core.warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        this.getWarehouse(this.core.warehouse)
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
      this.core.storeService().getStoreByPrimaryKeyInApi(store).subscribe((doc:any)=>{
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
      this.core.warehouseService().getWarehouseByPrimaryKeyInApi(warehouse).subscribe((doc:any)=>{
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
