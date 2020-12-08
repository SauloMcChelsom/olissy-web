import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

//import { map } from 'rxjs/operators';
//import { take } from 'rxjs/operators';
//import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { Client, ClientService } from '../../../../service/client.service';
import { Store, StoreService } from '../../../../service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public userForm: FormGroup = this.createForm(this.userService.user);

  public client:Client= this.clientService.client

  public store:Store  = this.storeService.store

  public active = {
    text: "",
    message:false
  }

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService,
    private fb: FormBuilder
  ){}

  public ngOnInit() {
    window.scroll(0,0);
  }

  private createForm (user: User): FormGroup { 
    return this.fb.group(user); 
  }

  private getForm():User {
    return this.userForm.value
  }

  private updateForm(user: Partial<User>): void {
    this.userForm.patchValue(user)
  }

  public async validateForm(){
    this.userForm.get('email').markAsTouched()
    this.userForm.get('password').markAsTouched()

    if(this.userForm.get('password').invalid){
      this.active.text = "Por favor Preencher campo senha"
      this.active.message = true
    }

    if(this.userForm.get('email').invalid){
      this.active.text = "Por favor Preencher campo email"
      this.active.message = true
    }

    if(this.userForm.valid){
      this.active.message = false
      this.view.setLoader(true)

      await this.verifyEmailExisted()
    }
    window.scroll(0,0);
  }

  public async verifyEmailExisted(){

    let errorServer:boolean = false
    let email:any = [{existed:false}]
    
    await this.userService.emailInformedExistsInApi(this.getForm()).then( 
      ((res)=>{email = res}),
      ((err)=>{errorServer = true})
    ).finally(
      ()=>{} 
    )
   
    if(email[0].existed){
      await this.authentication()
    }else{
      this.active.text = `email ${this.userForm.value.email} não esta cadastrado`
      this.active.message = true
      this.view.setLoader(false)
      if(errorServer){
        this.active.text = 'Error na comunicação com o servidor, GUARDE! estamos trabalhando nisso'
       }
    }
  }

  public async authentication(){ 
    await this.userService.signInWithEmailAndPasswordInFirebaseInApi(this.getForm()).then(
      ((res) =>this.getUser(res)),
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
    ).finally(
      ()=>{}
    )
  }

  public async getUser(userIsLogged){
    this.userForm.patchValue({foreign_key_uid:userIsLogged.user.uid})  
    await this.userService.informationOfUserInApi(this.getForm()).then(
      (async(res)=>{ 
        this.userForm.patchValue(res[0].user[0]), 
        this.userService.setUserInState([this.getForm()])
        await this.userType(res) 
      }),
      ((err)=>{ 
        this.active.text = "Falhou em recuperar suas informações, por favor tente novamente" 
        this.active.message = true
        this.view.setLoader(false)
      })
    ).finally(
      ()=>{}
    )
  }

  public async userType(user){
    if(this.userForm.value.type == 1){
      this.clientService.setClientInState([user[0].client[0]])
      this.view.setUser('client')
      if(this.userHaveOrderInOpen())
      this.view.redirectPageFor('/client-home')
    }

    if(this.userForm.value.type == 2){
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
