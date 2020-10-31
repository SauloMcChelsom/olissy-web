import { Component, OnDestroy } from '@angular/core';
import { View } from './shared/view.shared';
import { UserService, User } from './service/user.service';
import { Client, ClientService } from './service/client.service';
import { Store, StoreService } from './service/store.service';

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

  public user:User = this.userService.user

  public client:Client = this.clientService.client

  public store:Store = this.storeService.store

  private unsubscribe$ = new Subject();

  public view$ = "user"

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){}

  async ngOnInit() {
    this.viewUser()
    await this.getUserLogged()
  }

  public viewUser(){
    this.view.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe((v)=>{
      this.view$ = v[0]
    })
  }

  private async getUserLogged(){
    let user = null
    await this.userService.isLoggedInApi().pipe(takeUntil(this.unsubscribe$), take(1), map(u => user = u ) ).toPromise()
   
    if(user != null){
      this.user.FOREIGN_KEY_UID = user.uid
      this.user.email = user.email

      await this.userService.getUserByUidInApi(this.user).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.user = v[0]) ).toPromise()
      this.userService.setUserInState([this.user])
      await this.userType()
    }
  }

  private async userType(){
    if(this.user.type == 1){
      this.client.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.clientService.getClientByForeignKeyUserInApi( this.client).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) =>  this.client = v[0]) ).toPromise()
      this.clientService.setClientInState([this.client])
      this.view.setUser('client')
      //this.view.redirectPageFor('/client-home')
    }

    if(this.user.type == 2){
      this.store.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.storeService.getStoreByForeignKeyUserInApi(this.store).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.store = v[0]) ).toPromise()
      this.storeService.setStoreInState(this.store)
      this.view.setUser('store')
      this.view.redirectPageFor('/store-home')
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
