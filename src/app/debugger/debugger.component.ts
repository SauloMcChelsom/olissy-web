import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { View } from '../shared/view.shared';
import { UserService, User } from '../service/user.service';
import { ClientService, Client } from '../service/client.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'debugger',
  templateUrl: 'app.debugger.html',
  styleUrls: ['app.debugger.css']
})

export class DebuggerComponent{

  public getUser = this.view.getUser()
  public user$: Observable<User[]> = this.user.getUserInState()
  public client$: Observable<Client[]> = this.client.getClientInState()

  constructor(
    private user:UserService,
    private client: ClientService,
    private view:View
  ) {}
}
