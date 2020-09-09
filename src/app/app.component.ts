import { Component, OnDestroy } from '@angular/core';

import { View } from './shared/view.shared';
import { UserService } from './service/user.service';
import { ClientService } from './service/client.service';
import { StoreService } from './service/store.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements  OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){}

  async ngOnInit() {
    await this.getUserLogged()
  }

  private async getUserLogged(){
    let user = null
    await this.userService.isLoggedInApi().pipe(takeUntil(this.unsubscribe$), take(1), map(u => user = u ) ).toPromise()
    if(user != null){
      this.userService.user.FOREIGN_KEY_UID = user.uid
      this.userService.user.email = user.email

      await this.userService.getUserByUidInApi(this.userService.user).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.userService.user = v[0]) ).toPromise()
      this.userService.setUserInState([this.userService.user])
      await this.userType()
    }
    this.view.setLoader(false)
  }

  private async userType(){
    
    if(this.userService.user.type == 1){
      this.clientService.client.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.clientService.getClientByForeignKeyUserInApi(this.clientService.client).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.clientService.client = v[0]) ).toPromise()
      this.clientService.setClientInState([this.clientService.client])
      this.view.setUser('client')
      this.view.redirectPageFor('/home-client')
    }

    if(this.userService.user.type == 2){
      this.storeService.store.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.storeService.getStoreByForeignKeyUserInApi(this.storeService.store).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.storeService.store = v[0]) ).toPromise()
      this.storeService.setStoreInState(this.storeService.store)
      this.view.setUser('store')
      //this.view.redirectPageFor('/home-store')
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
