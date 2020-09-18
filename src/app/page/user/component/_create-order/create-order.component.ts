import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';
import { View } from '../../../../shared/view.shared';
import { StoreService, Store } from '../../../../service/store.service';
import { Order } from '../../../../service/order.service';

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

  public store:Store

  private unsubscribe$ = new Subject();

  public formOrder: FormGroup = this.createForm({
    FOREIGN_KEY_CLIENT: '',
    addressFullOfClient: '',
    nameOfClient: '',
    lastNameOfClient: '',
    imageIconUrlOfClient: '',
    emailOfClient: '',
    cellPhoneOfClient: '',
    cityOfClient: '',
    neighborhoodOfClient: '',
    streetOfClient: '',
    FOREIGN_KEY_STORE: '',
    nameOfStore: '',
    imageIconUrlOfStore: '',
    cellPhoneOfStore: '',
    emailOfStore: '',
    cityOfStore: '',
    neighborhoodOfStore: '',
    streetOfStore: '',
    cnpjOfStore: '',
    AUTOINCREMENT: '',
    DATE: '',
    PRIMARY_KEY: '',
    methodPayment: '',
    informChange: '',
    orderState: '',
    storeViewedTheOrder: false,
    totalOrderValue: 0,
    product: [{}],
    taxaOfPlatform: 0,
    note: [{}],
    taxaDeliverySelectByClientStatus:'',
    taxaDeliverySelectByClient:{
      description:'Escolha a opção', 
      value: '', 
      taxa:0,
      km:0
    }
  });
 
  constructor(
    private view:View,
    private storeService:StoreService,
    private fb: FormBuilder
  ){}

  private createForm (order: Order): FormGroup { 
    return this.fb.group (order); 
  }

  private updateForm(order: Partial<Order>): void {
    this.formOrder.patchValue(order)
  }

  public async ngOnInit() {
    window.scroll(0,0);
    this.view.putLoader()
    this.getOrderInLocalStorage()
  }

  public getOrderInLocalStorage(){
    this.updateForm(JSON.parse(localStorage.getItem('order')))
    this.getStore(this.formOrder.value.FOREIGN_KEY_STORE)
  }

  public getStore(PRIMARY_KEY){
    this.storeService.store.PRIMARY_KEY = PRIMARY_KEY
    this.storeService.getStoreByPrimaryKeyInApi(this.storeService.store).pipe(take(1), takeUntil(this.unsubscribe$)).subscribe((store:Store[])=>{
      this.store = store[0]
    })
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
    localStorage.setItem('order', JSON.stringify(this.formOrder.value))
  }

  public setMethodPaymentForMoney(value){
    if(value == "debit" || value == "credit" ){
      this.formOrder.get("informChange").reset('0.00')
    }else{
      this.formOrder.get("informChange").reset(null)
      this.formOrder.get("informChange").markAsTouched();
    }
    localStorage.setItem('order', JSON.stringify(this.formOrder.value))
  }

  public TOTAL(){
    let order = this.formOrder.value.totalOrderValue
    let taxa = this.formOrder.value.taxaOfPlatform
    let delivery = this.formOrder.value.taxaDeliverySelectByClient.taxa
    if(this.formOrder.value.taxaDeliverySelectByClient.value == 'deliveryFreeAbove'){
      return order + taxa + 0
    }
    return order + taxa + delivery
  }

  public encreaseItem(index){
    if(this.formOrder.value.product[index].quantity < this.formOrder.value.product[index].quantities){
      
      this.formOrder.value.product[index].quantity++
      this.formOrder.patchValue({product: this.formOrder.value.product})

      this.formOrder.patchValue({totalOrderValue : (this.formOrder.value.totalOrderValue - this.formOrder.value.product[index].totalOfPrice) + (this.formOrder.value.product[index].price * this.formOrder.value.product[index].quantity)})
     
      this.formOrder.value.product[index].totalOfPrice = this.formOrder.value.product[index].price * this.formOrder.value.product[index].quantity
      this.formOrder.patchValue({product: this.formOrder.value.product})

      localStorage.setItem('order', JSON.stringify(this.formOrder.value))
    }
  }

  public decreaseItem(index){
    if(this.formOrder.value.product[index].quantity > 1){

      this.formOrder.value.product[index].quantity--
      this.formOrder.patchValue({product: this.formOrder.value.product})

      this.formOrder.value.product[index].totalOfPrice = this.formOrder.value.product[index].totalOfPrice - this.formOrder.value.product[index].price
      this.formOrder.patchValue({product: this.formOrder.value.product})
      
      this.formOrder.patchValue({totalOrderValue : this.formOrder.value.totalOrderValue - this.formOrder.value.product[index].price})
     
      if(this.formOrder.value.taxaDeliverySelectByClient.value == 'deliveryFreeAbove' && this.formOrder.value.totalOrderValue < this.store.deliveryFreeAbove.taxa){
        this.formOrder.patchValue({taxaDeliverySelectByClientStatus : 'negotiateRateDelivery'})
        this.formOrder.patchValue({taxaDeliverySelectByClient: {description:'Negociar taxa de entrega por Telefone', taxa:0, km:0, value: 'negotiateRateDelivery'}})
      }
      localStorage.setItem('order', JSON.stringify(this.formOrder.value))
    }
  }

  public deleteItem(index){
    this.formOrder.patchValue({totalOrderValue : this.formOrder.value.totalOrderValue - this.formOrder.value.product[index].totalOfPrice})
    
    this.formOrder.value.product.splice(index, 1)
    this.formOrder.patchValue({product: this.formOrder.value.product})
    
    if(this.formOrder.value.taxaDeliverySelectByClient.value == 'deliveryFreeAbove' && this.formOrder.value.totalOrderValue < this.store.deliveryFreeAbove.taxa){
      this.formOrder.patchValue({taxaDeliverySelectByClientStatus : 'negotiateRateDelivery'})
      this.formOrder.patchValue({taxaDeliverySelectByClient: {description:'Negociar taxa de entrega por Telefone', taxa:0, km:0, value: 'negotiateRateDelivery'}})
    }

    localStorage.setItem('order', JSON.stringify(this.formOrder.value))

    if(Object.keys(this.formOrder.value.product).length == 0){
      this.view.setLoader(true)
      localStorage.removeItem('order')
      this.view.redirectPageFor(`/home`)
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
    localStorage.setItem('order', JSON.stringify(this.formOrder.value))
    console.log(this.formOrder.value)
    //this.view.setLoader(true)
    //this.view.redirectPageFor(`/login`)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
