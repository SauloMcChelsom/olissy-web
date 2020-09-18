import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';
import { Order, OrderService } from '../../../../service/order.service';

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

  public order:Order

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
    private route: ActivatedRoute
  ){
    this.order = this.orderService.order()
  }

  public ngOnInit() {
    setTimeout(() => { this.view.setLoader(false) }, 3000)
    this.order.product.pop()
    this.getProduct()
    this.getStore()
  }

  public  getProduct() {
     this.productService.getProductByIndexInApi().pipe(takeUntil(this.unsubscribe$)).subscribe(async(product:Product[])=>{
      for (const index in product) {
        this.products.push(product[index])

        this.warehouseService.warehouse.PRIMARY_KEY = product[index].FOREIGN_KEY_WAREHOUSE
        await this.getWarehouse(this.warehouseService.warehouse)
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
    this.storeService.store.PRIMARY_KEY = this.route.parent.snapshot.params.id
    this.storeService.getStoreByPrimaryKeyInApi(this.storeService.store).pipe(takeUntil(this.unsubscribe$), take(1)).subscribe( (store:Store[]) =>{
      localStorage.removeItem('order')
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
    let warehouse:Warehouse = this.warehouses.find(warehouse => warehouse.PRIMARY_KEY == product.FOREIGN_KEY_WAREHOUSE)

    let item = {
      FOREIGN_KEY_PRODUCT : product.PRIMARY_KEY,
      name : warehouse.name,
      price : Number(product.price),
      quantity:1,
      totalOfPrice:Number(product.price),
      quantities:product.quantities,
    }

    const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    if(foundItem){
      if(foundItem.quantity < foundItem.quantities){
        foundItem.quantity++;
        this.order.totalOrderValue = (this.order.totalOrderValue - foundItem.totalOfPrice) + (foundItem.price * foundItem.quantity)
        foundItem.totalOfPrice = foundItem.price * foundItem.quantity;
      }
    }else{
      this.order.totalOrderValue += item.totalOfPrice
      this.order.product.push(item)
    }
    localStorage.setItem('order', JSON.stringify(this.order))
  }

  public decreaseItemCart(product, index){
    const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === product.PRIMARY_KEY);

    if(foundItem.quantity > 1){
      foundItem.quantity--
      foundItem.totalOfPrice = foundItem.totalOfPrice - foundItem.price
      this.order.totalOrderValue =  this.order.totalOrderValue - foundItem.price
    }else{
      this.order.totalOrderValue =  this.order.totalOrderValue - foundItem.price
      this.order.product.splice(index, 1)
    }

    if(Object.keys(this.order.product).length == 0){
      localStorage.removeItem('order')
    }else{
      localStorage.setItem('order', JSON.stringify(this.order))
    }
    
  }

  public encreaseItem(item){
    const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    if(foundItem){
      if(foundItem.quantity < foundItem.quantities){
        foundItem.quantity++;
        this.order.totalOrderValue = (this.order.totalOrderValue - foundItem.totalOfPrice) + (foundItem.price * foundItem.quantity)
        foundItem.totalOfPrice = foundItem.price * foundItem.quantity;
      }
    }
    localStorage.setItem('order', JSON.stringify(this.order))
  }

  public decreaseItem(item, index){
    const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    if(foundItem.quantity > 1){
      foundItem.quantity--
      foundItem.totalOfPrice = foundItem.totalOfPrice - foundItem.price
      this.order.totalOrderValue =  this.order.totalOrderValue - foundItem.price
    }
    localStorage.setItem('order', JSON.stringify(this.order))
  }

  public deleteItem(item, index){
    const foundItem: any = this.order.product.find(items => items.FOREIGN_KEY_PRODUCT === item.FOREIGN_KEY_PRODUCT);

    this.order.totalOrderValue = this.order.totalOrderValue - foundItem.totalOfPrice
    this.order.product.splice(index, 1)
    localStorage.setItem('order', JSON.stringify(this.order))
    if(Object.keys(this.order.product).length == 0){
      localStorage.removeItem('order')
    }
  }

  public sedOrder(){
    localStorage.setItem('order', JSON.stringify(this.order))
    this.view.redirectPageFor('/user-create-order')
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
