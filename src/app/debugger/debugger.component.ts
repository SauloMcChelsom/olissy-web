import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { View } from '../shared/view.shared';
import { UserService, User } from '../service/user.service';
import { ClientService, Client } from '../service/client.service';
import { StoreService, Store } from '../service/store.service';

@Component({
  selector: 'debugger',
  templateUrl: 'debugger.component.html',
  styleUrls: ['debugger.component.css']
})

export class DebuggerComponent{

  public view$: Observable<any[]> = this.view.getUser()
  public user$: Observable<User[]> = this.user.getUserInState()
  public client$: Observable<Client[]> = this.client.getClientInState()
  public store$: Observable<Store[]> = this.store.getStoreInState()

  constructor(
    private user:UserService,
    private client: ClientService,
    private store: StoreService,
    private view:View
  ){}
}
