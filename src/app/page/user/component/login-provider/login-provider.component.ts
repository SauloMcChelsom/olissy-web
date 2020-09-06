import { Component, OnInit, OnDestroy } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mt-login',
  templateUrl: './login-provider.component.html',
  styleUrls: ['./login-provider.component.css']
})

export class LoginProviderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public avatar:string = null

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){}

  public async ngOnInit() {
    this.view.putLoader()
  }

  public async logout() {
    await this.userService.logoutInApi()
  }

  public async signInWithGoogle(){
    let token = null
    await this.userService.signInWithPopupInApi().then(v => token = v)
     this.userService.user.FOREIGN_KEY_UID = token.user.uid
     this.userService.user.email = token.user.email
     this.userService.user.name = token.user.displayName
     this.clientService.client.name = token.user.displayName
     this.clientService.client.cellPhone = token.user.phoneNumber
     this.clientService.client.imageIconUrl = token.user.photoURL
     this.clientService.client.imageIconPath = 'google'

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
    await this.userService.getUserByEmailInApi( this.userService.user).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => user = v) ).toPromise()

    if(Object.keys(user).length == 0){
      await this.createNewUser()
    }else{
      this.userService.user = user[0]
      this.userService.setUserInState([user[0]])
      await this.userType()
    }
  }

  public async createNewUser(){
    let newUser:User
    this.userService.user.type = 1
    await this.userService.createNewUserWithPopupInApi( this.userService.user).then( v => newUser = v )
    this.userService.setUserInState([newUser])

    this.clientService.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    await this.clientService.createNewClientInApi( this.clientService.client).then( v => newClient = v )
    this.clientService.client = newClient
    await this.userType()
  }

  public async userType(){
    if(this.userService.user.type == 1){
      this.clientService.client.FOREIGN_KEY_USER =   this.userService.pullUserInState().PRIMARY_KEY
      await this.clientService.getClientByForeignKeyUserInApi( this.clientService.client).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) =>  this.clientService.client = v[0]) ).toPromise()
      this.clientService.setClientInState([ this.clientService.client])
      this.view.setUser('client')
      this.view.redirectPageFor('/home-client')
    }

    if(this.userService.user.type == 2){
      this.storeService.store.FOREIGN_KEY_USER =   this.userService.pullUserInState().PRIMARY_KEY
      await this.storeService.getStoreByForeignKeyUserInApi( this.storeService.store).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) =>  this.storeService.store = v[0]) ).toPromise()
      this.storeService.setStoreInState( this.storeService.store)
      this.view.setUser('store')
      this.view.redirectPageFor('/home-store')
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
