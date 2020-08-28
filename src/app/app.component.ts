import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Core, User, Client, } from './shared/core';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

  public user$: Observable<User[]> = this.core.userService().getUserInState()
  public client$: Observable<Client[]> = this.core.clientService().getClientInState()
  public view = this.core.view

  constructor(
    private core:Core,
    private redirectPageFor: Router,
  ) {}

  async ngOnInit() {
    await this.getUserLogged()
  }

  private async getUserLogged(){
    let user = null
    await this.core.userService().isLoggedInApi().pipe(take(1), map(u => user = u ) ).toPromise()
    if(user != null){
      this.core.user.FOREIGN_KEY_UID = user.uid
      this.core.user.email = user.email
      await this.core.userService().getUserByUidInApi(this.core.user).pipe(take(1), map( (v:any) => this.core.user = v[0]) ).toPromise()
      this.core.userService().setUserInState([this.core.user])
      await this.userType()
    }

  }

  private async userType(){
    
    if(this.core.user.type == 1){
      this.core.client.FOREIGN_KEY_USER = this.core.userService().pullUserInState().PRIMARY_KEY
      await this.core.clientService().getClientByForeignKeyUserInApi(this.core.client).pipe(take(1), map( (v:any) => this.core.client = v[0]) ).toPromise()
      this.core.clientService().setClientInState([this.core.client])
      this.core.view.user = "client"
      //this.redirectPageFor.navigate(['/home'])
    }

    if(this.core.user.type == 2){
      this.core.store.FOREIGN_KEY_USER = this.core.userService().pullUserInState().PRIMARY_KEY
      await this.core.storeService().getStoreByForeignKeyUserInApi(this.core.store).pipe(take(1), map( (v:any) => this.core.store = v[0]) ).toPromise()
      this.core.storeService().setStoreInState(this.core.store)
      this.core.view.user = "store"
      //this.redirectPageFor.navigate(['/home'])
    }
  }


}
