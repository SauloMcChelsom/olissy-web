import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
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
    this.view.setLoader(false)
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
    let user = []
    
    await this.userService.getUserByEmailInApi(this.getForm()).pipe(takeUntil(this.unsubscribe$), take(1), map(v => user = v) ).toPromise()

    if(Object.keys(user).length != 0){
      await this.authentication()
    }else{
      this.active.text = `email ${this.userForm.value.email} não esta cadastrado`
      this.active.message = true
      this.view.setLoader(false)
    }
  }

  public async authentication(){ 
    let userIsLogged = null
    await this.userService.signInWithEmailAndPasswordInApi(this.getForm()).then( v =>  userIsLogged = v ).catch(()=> userIsLogged = false )
    if(userIsLogged){
      this.userForm.patchValue({FOREIGN_KEY_UID:userIsLogged.uid})  
      await this.userService.getUserByEmailInApi(this.getForm()).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.userForm.patchValue(v[0])) ).toPromise()
      this.userService.setUserInState([this.getForm()])
      await this.userType()
    }else{
      this.active.text = "senha errada" 
      this.active.message = true
      this.view.setLoader(false)
    }
  }

  public async userType(){
    if(this.userForm.value.type == 1){
      this.client.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.clientService.getClientByForeignKeyUserInApi(this.client).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.client = v[0]) ).toPromise()
      this.clientService.setClientInState([this.client])
      this.view.setUser('client')

      if(this.userHaveOrderInOpen())
      this.view.redirectPageFor('/client-home')
    }

    if(this.userForm.value.type == 2){
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
