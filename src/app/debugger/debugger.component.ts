import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { View } from '../shared/view.shared';
import { UserService, User } from '../service/user.service';
import { ClientService, Client } from '../service/client.service';
import { StoreService, Store } from '../service/store.service';
import { OrderService, Order } from '../service/order.service';
import { InvoiceService, Invoice } from '../service/invoice.service';

@Component({
  selector: 'debugger',
  templateUrl: 'debugger.component.html',
  styleUrls: ['debugger.component.css']
})

export class DebuggerComponent{

  public load$: Observable<Boolean> = this.view.getLoader()
  public view$: Observable<String> = this.view.getUser()
  public user$: Observable<User[]> = this.user.getUserInState()
  public client$: Observable<Client[]> = this.client.getClientInState()
  public store$: Observable<Store[]> = this.store.getStoreInState()
  public orderCreate$: Observable<Order[]> = this.order.getOrderInState('create')
  public orderUser$: Observable<Order[]> = this.order.getOrderInState('user')
  public invoice$: Observable<Invoice[]> = this.invoice.getInvoiceInState()

  constructor(
    private user:UserService,
    private client: ClientService,
    private store: StoreService,
    private order: OrderService,
    private invoice: InvoiceService,
    private view:View
  ){}

}
