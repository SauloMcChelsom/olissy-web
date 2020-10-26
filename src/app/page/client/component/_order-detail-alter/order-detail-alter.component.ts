import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';
import { View } from '../../../../shared/view.shared';
import { StoreService, Store } from '../../../../service/store.service';
import { ClientService, Client } from '../../../../service/client.service';
import { ProductService, Product } from '../../../../service/product.service';
import { UserService, User } from '../../../../service/user.service';
import { OrderShared }  from'../../../../shared/order.shared';
import { OrderService, Order } from '../../../../service/order.service';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mt-login',
  templateUrl: './order-detail-alter.component.html',
  styleUrls: ['./order-detail-alter.component.css']
})

export class OrderDetailAlterComponent implements OnInit, OnDestroy {

  public cellPhoneMask: any = {
    mask: '(00) 0 0000-0000',
    lazy: false
  };

  public PRIMARY_KEY = this.route.snapshot.params['id']

  private unsubscribe$ = new Subject();

  public store:Store = this.storeService.store

  public formOrder: FormGroup = this.createForm(this.orderService.order);

  public productUpdateQuantities = []
 
  constructor(
    private view:View,
    private storeService:StoreService,
    private orderShared:OrderShared,
    private orderService:OrderService,
    private clientService:ClientService,
    private userService:UserService,
    private fb: FormBuilder,
    private productService:ProductService,
    private route: ActivatedRoute
  ){}

  private createForm (order: Order): FormGroup { 
    return this.fb.group (order); 
  }

  private updateForm(order: Partial<Order>): void {
    this.formOrder.patchValue(order)
  }

  private getForm():Order {
    return this.formOrder.value
  }

  public ngOnInit() {
    window.scroll(0,0);
    this.view.setLoader(false)
    this.getOrderInLocalStorage()
  }

  public getOrderInLocalStorage(){
    this.orderService.getOrderInState('user').pipe(takeUntil(this.unsubscribe$)).subscribe((orders)=>{

      const order =  orders.filter( data => data.PRIMARY_KEY == this.PRIMARY_KEY )

      if(Object.keys(order).length != 0){
        this.updateForm(order[0])

        if(this.formOrder.value.addressFullOfClient == ''){
          this.formOrder.patchValue({addressFullOfClient: `${this.clientService.pullClientInState().street}, ${this.clientService.pullClientInState().neighborhood} - ${this.clientService.pullClientInState().city}`})
        }
  
        if(this.formOrder.value.cellPhoneOfClient == ''){
          this.formOrder.patchValue({cellPhoneOfClient: this.clientService.pullClientInState().cellPhone})
        }

        this.setproductUpdateQuantities()

        localStorage.setItem('order', JSON.stringify([this.formOrder.value]))
        this.orderService.setOrderInState([this.formOrder.value], 'create')
        this.getStore(this.formOrder.value.FOREIGN_KEY_STORE)
      }
    })
  }

  public setproductUpdateQuantities(){
    for (const key in this.formOrder.value.product) {
      this.productUpdateQuantities[key] = this.formOrder.value.product[key]
      this.productUpdateQuantities[key].updateQuantities = 0
      this.productUpdateQuantities[key].quantityInit = this.formOrder.value.product[key].quantity
    }
  }

  public getStore(PRIMARY_KEY){
    this.store.PRIMARY_KEY = PRIMARY_KEY
    this.storeService.getStoreByPrimaryKeyInApi(this.store).pipe(takeUntil(this.unsubscribe$),take(1)).subscribe((store:Store[])=>{
      this.store = store[0]
      this.chooseDeliveryRate()
    })
  }

  public getClient(){
    const user:User = this.userService.pullUserInState()
    const client:Client  = this.clientService.pullClientInState()
    this.formOrder.patchValue({
      FOREIGN_KEY_CLIENT: client.PRIMARY_KEY,
      cityOfClient: client.city,
      emailOfClient: user.email,
      imageIconUrlOfClient: client.imageIconUrl,
      lastNameOfClient: client.lastName,
      nameOfClient: client.name,
      streetOfClient: client.street
    })
  }

  public getAddressFullOfClient(){
    if(this.clientService.pullClientInState() == null){
     return ''
    }
    return `${this.clientService.pullClientInState().street}, ${this.clientService.pullClientInState().neighborhood} - ${this.clientService.pullClientInState().city}`
  }

  public setAddressFullOfClient(){
    this.formOrder.patchValue({addressFullOfClient: `${this.clientService.pullClientInState().street}, ${this.clientService.pullClientInState().neighborhood} - ${this.clientService.pullClientInState().city}`})
    localStorage.setItem('order', JSON.stringify([this.formOrder.value]))
    this.orderService.setOrderInState([this.formOrder.value], 'create')
  }

  public getCellPhoneOfClient(){
    if(this.clientService.pullClientInState() == null){
      return ''
     }
    return `${this.clientService.pullClientInState().cellPhone}`
  }

  public setCellPhoneOfClient(){
    this.formOrder.patchValue({cellPhoneOfClient: this.clientService.pullClientInState().cellPhone})
    localStorage.setItem('order', JSON.stringify([this.formOrder.value]))
    this.orderService.setOrderInState([this.formOrder.value], 'create')
  }

  public hideKeyboardCellPhoneOfUser(){
    if(this.formOrder.value.cellPhoneOfClient.length == 11){
      const tel = document.getElementById('clientCellPhone');
      tel.blur();
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
    localStorage.setItem('order', JSON.stringify([this.formOrder.value]))
    this.orderService.setOrderInState([this.formOrder.value], 'create')
  }

  public setMethodPaymentForMoney(value){
    if(value == "debit" || value == "credit" ){
      this.formOrder.get("informChange").reset('0.00')
    }else{
      this.formOrder.get("informChange").reset(null)
      this.formOrder.get("informChange").markAsTouched();
    }
    localStorage.setItem('order', JSON.stringify([this.formOrder.value]))
    this.orderService.setOrderInState([this.formOrder.value], 'create')
  }

  public chooseDeliveryRate(){
    let order:Order = this.orderService.pullOrderInState('create')
    if(order.taxaDeliverySelectByClient.value == 'deliveryFreeAbove' && order.totalOrderValue < this.store.deliveryFreeAbove.taxa){
        order.taxaDeliverySelectByClientStatus = 'negotiateRateDelivery'
        order.taxaDeliverySelectByClient = {
          description:'Negociar taxa de entrega por Telefone',
          taxa:0,
          km:0, 
          value: 'negotiateRateDelivery'
        }
    }
    localStorage.setItem('order', JSON.stringify([order]))
    this.orderService.setOrderInState([order], 'create')
    this.updateForm(order)
  }

  public TOTAL(){
    return this.orderShared.Total()
  }

  public encreaseItem(item, index){ 
    if(item.quantity < item.quantityInit){
      this.productUpdateQuantities[index].updateQuantities = 1 + this.productUpdateQuantities[index].updateQuantities

      console.log(item.updateQuantities)
      this.orderShared.encreaseItem(item)
      this.updateForm(this.orderService.pullOrderInState('create'))
    }

  }

  public decreaseItem(item, index){
    if(item.quantity > 1){
      this.productUpdateQuantities[index].updateQuantities = -1 + this.productUpdateQuantities[index].updateQuantities
    }
    console.log(item.updateQuantities)
    this.orderShared.decreaseItem(item)
    this.chooseDeliveryRate()
    this.updateForm(this.orderService.pullOrderInState('create'))
  }

  public canceltem(item, index){
    this.productUpdateQuantities[index].updateQuantities = -this.productUpdateQuantities[index].quantityInit
    this.orderShared.canceltem(item)
    this.chooseDeliveryRate()
    this.updateForm(this.orderService.pullOrderInState('create'))
  }

  public back(){
    this.orderShared.deleteOrder()
    this.view.redirectPageFor(`/client-order-detail/${this.formOrder.value.PRIMARY_KEY}`)
  }

  public async UpdateQuantitiesInApi(){
    for (const key in this.productUpdateQuantities){
      //indentificar se o numero e positivo ou negativo
      if(Math.sign(this.productUpdateQuantities[key].updateQuantities) == 1){
        let product = this.productService.product
        product.quantities = -Math.abs(this.productUpdateQuantities[key].updateQuantities)//converte negativo
        product.PRIMARY_KEY = this.productUpdateQuantities[key].FOREIGN_KEY_PRODUCT
        await this.productService.updateQuantitiesInApi(product)
      }
      if(Math.sign(this.productUpdateQuantities[key].updateQuantities) == -1){
        let product = this.productService.product
        product.quantities = Math.abs(this.productUpdateQuantities[key].updateQuantities)//converte negativo
        product.PRIMARY_KEY = this.productUpdateQuantities[key].FOREIGN_KEY_PRODUCT
        await this.productService.updateQuantitiesInApi(product)
      }
    } 
  }

  public validateForm(){
    this.formOrder.get("addressFullOfClient").markAsTouched();
    this.formOrder.get("cellPhoneOfClient").markAsTouched();
    this.formOrder.get("taxaDeliverySelectByClientStatus").markAsTouched();
    this.formOrder.get("methodPayment").markAsTouched();
    this.formOrder.get("informChange").markAsTouched();

    window.scroll(0, 0);
    localStorage.setItem('order', JSON.stringify([this.formOrder.value]))
    this.orderService.setOrderInState([this.formOrder.value], 'create')

    if(this.formOrder.valid){
      this.sendOrder()
    }
  }

  public async sendOrder(){
    this.view.setLoader(true)
    await this.UpdateQuantitiesInApi()
    this.getClient()
    await this.orderService.putOrderByForeignKeyClientInApi(this.formOrder.value.PRIMARY_KEY, this.getForm()).then( v => v )
    this.orderShared.deleteOrder()
    this.view.redirectPageFor(`/client-order-detail/${this.formOrder.value.PRIMARY_KEY}`)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
