import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login',
  templateUrl: './login-provider.component.html',
  styleUrls: ['./login-provider.component.css']
})

export class LoginProviderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public avatar:string = null

  public user:User = this.userService.user

  public client:Client = this.clientService.client
  
  public store:Store = this.storeService.store

  public active = {
    text: "",
    message:false,
  }
  
  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){}

  public async ngOnInit() {
    window.scroll(0,0);
  }

  public async logout() {
    await this.userService.logoutInFirebaseInApi()
  }

  public async signInWithGoogle(){
    await this.userService.createNewOrSignInUserWithPopupInFirebaseInApi().then(
      (async(res) =>{
        this.user.foreign_key_uid = res.user.uid
        this.user.email = res.user.email
        this.user.name = res.user.displayName
        this.client.name = res.user.displayName
        this.client.cellphone = res.user.phoneNumber
        this.client.image_icon_url = res.user.photoURL
        this.client.image_icon_path = 'google'
        this.user.provide = 'google'
        await this.verifyEmailExisted()
      }),
      ((err)=>{
        if(err.code == 'auth/wrong-password'){
          this.active.text = "A senha é inválida.<br \/><br \/> Caso seja dono deste e-mail, ou se esqueceu da sua senha. <br \/><br \/> <a href=\"https://www.olissy.com/recuperar-email\"\/>Clicar aqui para recupera-lo<\/a>"
        }
        if(err.code == 'auth/network-request-failed'){
          this.active.text = "Sem Acesso a internet"
        }
        this.active.message = true
        this.view.setLoader(false)
      })
    )
  }

  public signInWithMicrosoft(){
    //this.userService.authenticationByGoogleInApi()
  }

  public signInWithApple(){
    //  this.userService.authenticationByGoogleInApi()
  }

  public async verifyEmailExisted(){
    this.view.setLoader(true)
 
    let email:any = [{existed:true}]
    
    await this.userService.emailInformedExistsInApi(this.user).then( 
      ((res)=>{email = res}),
      ((err)=>{
        this.view.setLoader(false)
        this.active.message = true
        this.active.text = 'Error na comunicação com o servidor, GUARDE! estamos trabalhando nisso'
      })
    )

    if(email[0].existed == false){
      await this.createNewUser()
    }else{
      await this.getUser()
    }
  }

  public async createNewUser(){
    console.log(this.user)
    await this.userService.createNewAccountInOlisyInApi(this.user).then(
      (async()=> { await this.getUser()}),
      ((err)=>{ 
        this.userService.deleteUserInFirebaseInApi().then(()=> {
          this.active.text = `Erro em criar sua conta, nós deletemos sua informaçãoes para você tentar novamente`
          this.active.message = true
          this.view.setLoader(false)
        }).catch((error)=>{
          this.active.text = `Erro em criar sua conta, nós não conseguimos deletar seu e-mail, nós mande um email para <contado@olissy.com>`
          this.active.message = true
          this.view.setLoader(false)
        });
      })
    )
  }

  public async getUser(){
    await this.userService.informationOfUserInApi(this.user).then(
      (async(res)=>{ 
        console.log(res)
        this.userService.setUserInState([res[0].user[0]])
        await this.userType(res) 
      }),
      ((err)=>{ 
        this.active.text = "Falhou em recuperar suas informações, por favor tente novamente" 
        this.active.message = true
        this.view.setLoader(false)
      })
    )
  }

  public async userType(user){
    if(this.user.type == 1){
      this.clientService.setClientInState([user[0].client[0]])
      this.view.setUser('client')

      if(this.userHaveOrderInOpen())
      this.view.redirectPageFor('/client-home')
    }

    if(this.user.type == 2){
      this.storeService.setStoreInState(user[0].store[0])
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
