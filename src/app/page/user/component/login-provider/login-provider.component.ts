import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { Core, User, Client } from '../../../../shared/core';

@Component({
  selector: 'mt-login',
  templateUrl: './login-provider.component.html',
  styleUrls: ['./login-provider.component.css']
})

export class LoginProviderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public avatar:string = null

  constructor(
    private redirectPageFor: Router,
    private core:Core
  ){}

  public async ngOnInit() {

  }

  public async isLogged(){
    let user = null
    await this.core.userService().isLoggedInApi().pipe(take(1), map(u => user = u ) ).toPromise()
    console.log(user)
  }

  public async logout() {
    await this.core.userService().logoutInApi()
  }

  public async signInWithGoogle(){
    let token = null
    await this.core.userService().signInWithPopupInApi().then(v => token = v)
    this.core.user.FOREIGN_KEY_UID = token.user.uid
    this.core.user.email = token.user.email
    this.core.user.name = token.user.displayName
    this.core.client.name = token.user.displayName
    this.core.client.cellPhone = token.user.phoneNumber
    this.core.client.imageIconUrl = token.user.photoURL
    this.core.client.imageIconPath = 'google'

    await this.verifyEmailExisted()
  }

  public signInWithMicrosoft(){
    //this.core.userService().authenticationByGoogleInApi()
  }

  public signInWithApple(){
    //this.core.userService().authenticationByGoogleInApi()
  }

  public async verifyEmailExisted(){
    let user:User
    await this.core.userService().getUserByEmailInApi(this.core.user).pipe(takeUntil(this.unsubscribe$), map( (v:any) => user = v) ).toPromise()

    if(Object.keys(user).length == 0){
      await this.createNewUser()
    }else{
      this.core.user = user[0]
      this.core.userService().setUserInState([user[0]])
      await this.userType()
    }
  }

  public async createNewUser(){
    let newUser:User
    this.core.user.type = 1
    await this.core.userService().createNewUserWithPopupInApi(this.core.user).then( v => newUser = v )
    this.core.userService().setUserInState([newUser])

    this.core.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    await this.core.clientService().createNewClientInApi(this.core.client).then( v => newClient = v )

    await this.userType()
  }

  public async userType(){
    if(this.core.user.type == 1){
      this.core.client.FOREIGN_KEY_USER = this.core.userService().pullUserInState().PRIMARY_KEY
      await this.core.clientService().getClientByForeignKeyUserInApi(this.core.client).pipe(takeUntil(this.unsubscribe$), map( (v:any) => this.core.client = v[0]) ).toPromise()
      this.core.clientService().setClientInState([this.core.client])
      this.core.view.user = "client"
      this.redirectPageFor.navigate(['/home'])
    }

    if(this.core.user.type == 2){
      this.core.store.FOREIGN_KEY_USER = this.core.userService().pullUserInState().PRIMARY_KEY
      await this.core.storeService().getStoreByForeignKeyUserInApi(this.core.store).pipe(takeUntil(this.unsubscribe$), map( (v:any) => this.core.store = v[0]) ).toPromise()
      this.core.storeService().setStoreInState(this.core.store)
      this.core.view.user = "store"
      this.redirectPageFor.navigate(['/home'])
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
