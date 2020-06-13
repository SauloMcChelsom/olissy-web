import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl  }  from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService  } from '../../AuthService';
import { order } from '../../interfaces';
import { ClientOrderService } from './client-order.service'

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})

export class ClientOrderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public PopularOrder:any = ""

  public order:order

  public token:any = ""

  public formularioMensagem: FormGroup = new FormGroup({
    'FOREIGN_KEY': new FormControl(null),
    'messageImageUrl': new FormControl(null),
    'messageName': new FormControl(null),
    'messageLastName': new FormControl(null),
    'message': new FormControl(null),
    'messageViewed': new FormControl(false),
    'messageDate': new FormControl(`${new Date()}`)
  })

  constructor(private clienteService:ClientOrderService,
              private authService: AuthService) {}

  ngOnInit() {
    this.buscarTodosPedidos()
  }

  public async buscarTodosPedidos(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((user:any)=>{
      this.token = user
        this.clienteService.getOrder(this.token.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((order:any)=>{
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
