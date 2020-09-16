import { Component, OnInit } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';
import { OrderService } from '../../../../service/order.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mt-product-of-store',
  templateUrl: './product-of-store.component.html',
  styleUrls: ['./product-of-store.component.css']
})

export class ProductOfStoreComponent implements OnInit {

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
    private orderService:OrderService
  ){}

  public ngOnInit() {
    setTimeout(() => { this.view.setLoader(false) }, 3000)
    this.orderService.order.product.pop()
    this.getProduct()
  }

  public order(product:Product){
    let warehouse:Warehouse = this.warehouses.find(warehouse => warehouse.PRIMARY_KEY == product.FOREIGN_KEY_WAREHOUSE)

    this.orderService.order.product = [{
      FOREIGN_KEY_PRODUCT : product.PRIMARY_KEY,
      name : warehouse.name,
      price : parseInt(product.price),
      quantity:1,
      totalOfPrice:parseInt(product.price),
      quantities:product.quantities,
    }]

    this.orderService.order.FOREIGN_KEY_STORE = product.FOREIGN_KEY_STORE

    this.orderService.order.totalOrderValue = parseInt(product.price)

    localStorage.setItem('order', JSON.stringify(this.orderService.order))

    this.view.redirectPageFor('/user-create-order')
  }

  public  getProduct() {
     this.productService.getProductByIndexInApi().pipe(takeUntil(this.unsubscribe$)).subscribe(async(product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        this.storeService.store.PRIMARY_KEY = product[index].FOREIGN_KEY_STORE
        await this.getStore(this.storeService.store)
  
        this.warehouseService.warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        await this.getWarehouse(this.warehouseService.warehouse)
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

  public encreaseItemCart(product){
    let warehouse:Warehouse = this.warehouses.find(warehouse => warehouse.PRIMARY_KEY == product.FOREIGN_KEY_WAREHOUSE)

    let item = {
      FOREIGN_KEY_PRODUCT : product.PRIMARY_KEY,
      name : warehouse.name,
      price : Number(product.price),
      quantity:1,
      totalOfPrice:Number(product.price),
      quantities:product.quantities,
    }

    const foundItem: any = this.orderService.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    if(foundItem){
      if(foundItem.quantity < foundItem.quantities){
        foundItem.quantity++;
        this.orderService.order.totalOrderValue = (this.orderService.order.totalOrderValue - foundItem.totalOfPrice) + (foundItem.price * foundItem.quantity)
        foundItem.totalOfPrice = foundItem.price * foundItem.quantity;
      }
    }else{
      this.orderService.order.totalOrderValue += item.totalOfPrice
      this.orderService.order.product.push(item)
    }
    localStorage.setItem('order', JSON.stringify(this.orderService.order))
  }

  public decreaseItemCart(product, index){
    const foundItem: any = this.orderService.order.product.find(items => items.FOREIGN_KEY_PRODUCT === product.PRIMARY_KEY);
    if(foundItem.quantity > 1){
      foundItem.quantity--
      foundItem.totalOfPrice = foundItem.totalOfPrice - foundItem.price
      this.orderService.order.totalOrderValue =  this.orderService.order.totalOrderValue - foundItem.price
    }else{
      this.orderService.order.totalOrderValue =  this.orderService.order.totalOrderValue - foundItem.price
      this.orderService.order.product.splice(index, 1)
    }
    localStorage.setItem('order', JSON.stringify(this.orderService.order))
  }

  public encreaseItem(item){
    const foundItem: any = this.orderService.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);
    if(foundItem){
      if(foundItem.quantity < foundItem.quantities){
        foundItem.quantity++;
        this.orderService.order.totalOrderValue = (this.orderService.order.totalOrderValue - foundItem.totalOfPrice) + (foundItem.price * foundItem.quantity)
        foundItem.totalOfPrice = foundItem.price * foundItem.quantity;
      }
    }
    localStorage.setItem('order', JSON.stringify(this.orderService.order))
  }

  public decreaseItem(item, index){
    const foundItem: any = this.orderService.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);
    if(foundItem.quantity > 1){
      foundItem.quantity--
      foundItem.totalOfPrice = foundItem.totalOfPrice - foundItem.price
      this.orderService.order.totalOrderValue =  this.orderService.order.totalOrderValue - foundItem.price
    }
    localStorage.setItem('order', JSON.stringify(this.orderService.order))
  }

  public deleteItem(item, index){
    const foundItem: any = this.orderService.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);
    this.orderService.order.totalOrderValue =  this.orderService.order.totalOrderValue - foundItem.totalOfPrice
    this.orderService.order.product.splice(index, 1)
    localStorage.setItem('order', JSON.stringify(this.orderService.order))
    if(Object.keys(this.orderService.order.product).length == 0){
      localStorage.removeItem('order')
    }
  }

  public sedOrder(){

    this.view.redirectPageFor('/user-create-order')
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
