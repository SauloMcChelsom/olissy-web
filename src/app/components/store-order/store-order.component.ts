import { Component, OnInit } from '@angular/core';
import { StoreOrderService } from './store-order.service'
import { FormGroup, FormControl  }  from '@angular/forms';
import { AuthService  } from '../../AuthService';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-store-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./store-order.component.css']
})
export class StoreOrderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public PopularOrder:any = ""

  public token:any = ""

  public iconeOrder:string = "/assets/plataform/cart.png"

  public formularioMensagem: FormGroup = new FormGroup({
    'FOREIGN_KEY': new FormControl(null),
    'messageImageUrl': new FormControl(null),
    'messageName': new FormControl(null),
    'messageLastName': new FormControl(null),
    'message': new FormControl(null),
    'messageViewed': new FormControl(false),
    'messageDate': new FormControl(`${new Date()}`)
  })

  constructor(private comercioService:StoreOrderService,
              private authService: AuthService) {}

  ngOnInit() {
    this.buscarTodosPedidos()
  }

  public async buscarTodosPedidos(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((user:any)=>{
      this.token = user
      this.comercioService.getOrder(this.token.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((order:any)=>{
        this.PopularOrder = order
      })
    })
  }

  public calculateTotalOrder(product, taxaPlataform, TaxaDelivery){
    return Number(product) + Number(taxaPlataform) + Number(TaxaDelivery);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}