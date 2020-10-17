import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-provider.component.html',
  styleUrls: ['./login-provider.component.css']
})

export class LoginProviderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public avatar:string = null

  public user:User

  public client:Client
  
  public store:Store
  
  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){}

  public async ngOnInit() {
    window.scroll(0,0);
    this.view.putLoader()
  }

  public async logout() {
    await this.userService.logoutInApi()
  }

  public async signInWithGoogle(){
    let token = null
    await this.userService.signInWithPopupInApi().then(v => token = v)

     this.user.FOREIGN_KEY_UID = token.user.uid
     this.user.email = token.user.email
     this.user.name = token.user.displayName
     this.client.name = token.user.displayName
     this.client.cellPhone = token.user.phoneNumber
     this.client.imageIconUrl = token.user.photoURL
     this.client.imageIconPath = 'google'

    await this.verifyEmailExisted()
  }

  public signInWithMicrosoft(){
    //  this.userService.authenticationByGoogleInApi()
  }

  public signInWithApple(){
    //  this.userService.authenticationByGoogleInApi()
  }

  public async verifyEmailExisted(){
    this.view.setLoader(true)
    let user:User
    await this.userService.getUserByEmailInApi(this.user).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => user = v) ).toPromise()

    if(Object.keys(user).length == 0){
      await this.createNewUser()
    }else{
      this.user = user[0]
      this.userService.setUserInState([user[0]])
      await this.userType()
    }
  }

  public async createNewUser(){
    let newUser:User
    this.user.type = 1
    await this.userService.createNewUserWithPopupInApi( this.user).then( v => newUser = v )
    this.userService.setUserInState([newUser])

    this.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    await this.clientService.createNewClientInApi(this.client).then( v => newClient = v )
    this.client = newClient
    await this.userType()
  }

  public async userType(){
    if(this.user.type == 1){
      this.client.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.clientService.getClientByForeignKeyUserInApi( this.client).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) =>  this.client = v[0]) ).toPromise()
      this.clientService.setClientInState([ this.client])
      this.view.setUser('client')

      if(this.userHaveOrderInOpen())
      this.view.redirectPageFor('/client-home')
    }

    if(this.user.type == 2){
      this.store.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.storeService.getStoreByForeignKeyUserInApi( this.store).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) =>  this.store = v[0]) ).toPromise()
      this.storeService.setStoreInState(this.store)
      this.view.setUser('store')
      this.view.redirectPageFor('/store-home')
    }
  }

  public userHaveOrderInOpen():Boolean{
    if(localStorage.getItem('order') != null){
      this.view.redirectPageFor('/client-create-order')
      return false
    }
    return true
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
