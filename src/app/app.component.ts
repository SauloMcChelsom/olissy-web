import { Component, OnDestroy } from '@angular/core';
import { View } from './shared/view.shared';
import { UserService, User } from './service/user.service';
import { Client, ClientService } from './service/client.service';
import { Store, StoreService } from './service/store.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements  OnDestroy{

  public user:User = this.userService.user

  public client:Client = this.clientService.client

  public store:Store = this.storeService.store

  private unsubscribe$ = new Subject();

  public page: Observable<String> = this.viewService.getUser()

  public window: Observable<Boolean> = this.viewService.getLoader()

  public view;

  constructor(
    private viewService:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){
    this.view = this.viewService
  }

  async ngOnInit() {

    await this.getUserLogged()
  }

  private async getUserLogged(){
    let user = null
    await this.userService.isLoggedInFirebaseInApi().pipe(takeUntil(this.unsubscribe$), take(1), map(u => user = u ) ).toPromise()
    
    if(user != null){
      this.user.foreign_key_uid = user.uid
      this.user.email = user.email
      await this.userService.informationOfUserInApi(this.user).then(
        (async(res)=>{ 
          this.userService.setUserInState([res[0].user[0]])
          await this.userType(res) 
        }),
        ((err)=>{})
      ).finally(
        ()=>{}
      )
    }else{
      this.viewService.setLoader(false)
    }
  }

  private async userType(user){
    if(this.user.type == 1){
      this.clientService.setClientInState([user[0].client[0]])
      this.view.setUser('client')
    //  this.view.redirectPageFor('/client-home')
    }

    if(this.user.type == 2){
      this.storeService.setStoreInState(user[0].store[0])
      this.view.setUser('store')
     // this.view.redirectPageFor('/store-home')
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
