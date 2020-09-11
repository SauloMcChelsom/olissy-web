import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { OrderService, Order } from '../../../../service/order.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mt-login',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit, OnDestroy {

  public cellPhoneMask: any = {
    mask: '(00) 0 0000-0000',
    lazy: false
  };

  public store

  private unsubscribe$ = new Subject();

  public formOrder: FormGroup = new FormGroup({
    FOREIGN_KEY_CLIENT: new FormControl(null),
    addressFullOfClient: new FormControl(null),
    nameOfClient: new FormControl(null),
    lastNameOfClient: new FormControl(null),
    imageIconUrlOfClient: new FormControl(null),
    emailOfClient: new FormControl(null),
    cellPhoneOfClient: new FormControl(null),
    cityOfClient: new FormControl(null),
    neighborhoodOfClient: new FormControl(null),
    streetOfClient: new FormControl(null),

    FOREIGN_KEY_STORE: new FormControl(null),
    nameOfStore: new FormControl(null),
    imageIconUrlOfStore: new FormControl(null),
    cellPhoneOfStore: new FormControl(null),
    emailOfStore: new FormControl(null),
    cityOfStore: new FormControl(null),
    neighborhoodOfStore: new FormControl(null),
    streetOfStore: new FormControl(null),
    cnpjOfStore: new FormControl(null),

    AUTOINCREMENT: new FormControl(null),
    DATE: new FormControl(null),
    PRIMARY_KEY: new FormControl(null),
    methodPayment: new FormControl(null),
    informChange: new FormControl(null),
    orderState: new FormControl("reserved"),
    storeViewedTheOrder: new FormControl(false),
    totalOrderValue: new FormControl(null),
    product: new FormControl(null),
    taxaOfPlatform: new FormControl(0),
    note: new FormControl(null),
    taxaDeliverySelectByClientStatus: new FormControl(null),//somente para validar "taxaDeliverySelectByClient" nao faz parte da order
    taxaDeliverySelectByClient: new FormControl({
      description:'Escolha a opção', 
      value: '', 
      taxa:0,
      km:0
    })
  })

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService,
    private orderService:OrderService
  ){}

  public async ngOnInit() {
    this.getOrderInLocalStorage()
    window.scroll(0,0);
    this.view.putLoader()
  }

  public TOTAL(){
    let order = this.formOrder.controls['totalOrderValue'].value
    let taxa = this.formOrder.controls['taxaOfPlatform'].value
    let delivery = this.formOrder.controls['taxaDeliverySelectByClient'].value.taxa
    if(this.formOrder.controls['taxaDeliverySelectByClient'].value.value == 'deliveryFreeAbove'){
      return order + taxa + 0
    }
    return order + taxa + delivery
  }

  public getOrderInLocalStorage(){
    this.orderService.order = JSON.parse(localStorage.getItem('order'))
    this.formOrder.patchValue({totalOrderValue:this.orderService.order.totalOrderValue})
    this.getStore(this.orderService.order.FOREIGN_KEY_STORE)
  }

  public getStore(PRIMARY_KEY){
    this.storeService.store.PRIMARY_KEY = PRIMARY_KEY
    this.storeService.getStoreByPrimaryKeyInApi(this.storeService.store).pipe(take(1), takeUntil(this.unsubscribe$)).subscribe((store:Store[])=>{
      this.store = store[0]
      this.formOrder.patchValue({
        FOREIGN_KEY_STORE: store[0].PRIMARY_KEY,
        nameOfStore: store[0].name,
        imageIconUrlOfStore: store[0].imageIconUrl,
        cellPhoneOfStore:store[0].cellPhone,
        emailOfStore:store[0].email,
        cityOfStore: store[0].city,
        neighborhoodOfStore: store[0].negotiateRateDelivery,
        streetOfStore: store[0].street,
        cnpjOfStore: store[0].cnpj,
      })
    })
  }

  public decreaseItem(index){
    if(this.orderService.order.product[index].quantity > 1){
      this.orderService.order.product[index].quantity--
      this.orderService.order.product[index].totalOfPrice = this.orderService.order.product[index].totalOfPrice - this.orderService.order.product[index].price
      this.orderService.order.totalOrderValue -= this.orderService.order.product[index].price
      this.formOrder.patchValue({totalOrderValue:this.orderService.order.totalOrderValue})
      localStorage.setItem('order', JSON.stringify(this.orderService.order))
      if(this.formOrder.controls['taxaDeliverySelectByClient'].value.value == 'deliveryFreeAbove' && this.formOrder.controls['totalOrderValue'].value < this.store.deliveryFreeAbove.taxa){
        this.formOrder.patchValue({taxaDeliverySelectByClient:{description:'Negociar taxa de entrega por Telefone', taxa:0, km:0, value: 'negotiateRateDelivery'}})
        this.formOrder.patchValue({ taxaDeliverySelectByClientStatus: 'negotiateRateDelivery'})
      }
    }
  }

  public encreaseItem(index){
    if(this.orderService.order.product[index].quantity < this.orderService.order.product[index].quantities){
      this.orderService.order.product[index].quantity++
      this.orderService.order.product[index].totalOfPrice = this.orderService.order.product[index].price * this.orderService.order.product[index].quantity
      this.orderService.order.totalOrderValue += this.orderService.order.product[index].price
      this.formOrder.patchValue({totalOrderValue:this.orderService.order.totalOrderValue})
      localStorage.setItem('order', JSON.stringify(this.orderService.order))
    }
  }

  public deleteItem(index){
    this.orderService.order.product.splice(index, 1)
    if(Object.keys(this.orderService.order.product).length == 0){
      this.view.setLoader(true)
      localStorage.removeItem('order')
      this.view.redirectPageFor(`/home`)
    }
  }

  public setTaxaDeliverySelectByClient(value){
    if(value == 'negotiateRateDelivery'){
      this.formOrder.patchValue({taxaDeliverySelectByClient:{description:'Negociar taxa de entrega por Telefone', taxa:0, km:0, value: 'negotiateRateDelivery'}})
    }
    if(value == 'onlyInNeighborhood'){
      this.formOrder.patchValue({taxaDeliverySelectByClient:{description:`Entrega GRÁTIS no bairro ${this.store.neighborhood}`, taxa:0, km:0, value: 'onlyInNeighborhood'}})
    }
    if(value == 'deliveryFreeAbove'){
      this.formOrder.patchValue({taxaDeliverySelectByClient:{description:`Entrega grátis acima de R${this.store.deliveryFreeAbove.taxa} por ${this.store.deliveryFreeAbove.km} por quilômetro`,taxa:0, km:this.store.deliveryFreeAbove.km, value: 'deliveryFreeAbove'}})
    }
    if(value == 'deliveryBy'){
      this.formOrder.patchValue({taxaDeliverySelectByClient:{description:`Entrega por R${this.store.deliveryBy.taxa} por quilômetro`,taxa:this.store.deliveryBy.taxa, value: 'deliveryBy'}})
    }
  }

  public setMethodPaymentForMoney(value){
    if(value == "debit" || value == "credit" ){
      this.formOrder.get("informChange").reset('0.00')
    }else{
      this.formOrder.get("informChange").reset(null)
      this.formOrder.get("informChange").markAsTouched();
    }
  }

  public validateForm(){

    this.formOrder.get("addressFullOfClient").markAsTouched();

    this.formOrder.get("cellPhoneOfClient").markAsTouched();

    this.formOrder.get("taxaDeliverySelectByClientStatus").markAsTouched();

    this.formOrder.get("methodPayment").markAsTouched();

    this.formOrder.get("informChange").markAsTouched();


    window.scroll(0, 0);
    if(this.formOrder.valid){
      this.typing()
    }
  }

  public typing(){
    this.orderService.order.FOREIGN_KEY_CLIENT =  this.formOrder.get("FOREIGN_KEY_CLIENT").value
    this.orderService.order.addressFullOfClient = this.formOrder.get("addressFullOfClient").value
    this.orderService.order.nameOfClient = this.formOrder.get("nameOfClient").value
    this.orderService.order.lastNameOfClient = this.formOrder.get("lastNameOfClient").value
    this.orderService.order.imageIconUrlOfClient = this.formOrder.get("imageIconUrlOfClient").value
    this.orderService.order.emailOfClient = this.formOrder.get("emailOfClient").value
    this.orderService.order.cellPhoneOfClient = this.formOrder.get("cellPhoneOfClient").value
    this.orderService.order.cityOfClient = this.formOrder.get("cityOfClient").value
    this.orderService.order.neighborhoodOfClient = this.formOrder.get("neighborhoodOfClient").value
    this.orderService.order.streetOfClient = this.formOrder.get("streetOfClient").value
    this.orderService.order.orderState = this.formOrder.get("orderState").value
    this.orderService.order.nameOfStore = this.formOrder.get("nameOfStore").value
    this.orderService.order.imageIconUrlOfStore = this.formOrder.get("imageIconUrlOfStore").value
    this.orderService.order.cellPhoneOfStore = this.formOrder.get("cellPhoneOfStore").value
    this.orderService.order.emailOfStore = this.formOrder.get("emailOfStore").value
    this.orderService.order.cityOfStore = this.formOrder.get("cityOfStore").value
    this.orderService.order.neighborhoodOfStore = this.formOrder.get("neighborhoodOfStore").value
    this.orderService.order.streetOfStore = this.formOrder.get("streetOfStore").value
    this.orderService.order.cnpjOfStore = this.formOrder.get("cnpjOfStore").value
    this.orderService.order.storeViewedTheOrder = this.formOrder.get("storeViewedTheOrder").value
    this.orderService.order.methodPayment = this.formOrder.get("methodPayment").value
    this.orderService.order.informChange = this.formOrder.get("informChange").value
    this.orderService.order.taxaOfPlatform = this.formOrder.get("taxaOfPlatform").value
    this.orderService.order.taxaDeliverySelectByClient = this.formOrder.get("taxaDeliverySelectByClient").value

    localStorage.setItem('order', JSON.stringify(this.orderService.order))

    this.view.setLoader(true)
    this.view.redirectPageFor(`/login`)
  }


  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
