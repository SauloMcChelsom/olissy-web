import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { ClientService } from '../../../../service/client.service';
import { StoreService } from '../../../../service/store.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public userForm: FormGroup = new FormGroup({
    AUTOINCREMENT: new FormControl(null),
    DATE:  new FormControl(null),
    PRIMARY_KEY:  new FormControl(null),
    FOREIGN_KEY_UID:  new FormControl(null),
    name: new FormControl('saulo' ,Validators.required),
    email: new FormControl('saulo@gmail.com' ,Validators.required),
    password: new FormControl('123456789' ,Validators.required),
    retypePassword: new FormControl('123456789' ,Validators.required),
    type: new FormControl(1),
    terms: new FormControl(true ,Validators.required)
  })

  public active = {
    text: "",
    message:false
  }

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService,
  ){}

  public async ngOnInit() {

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

      this.userService.user.email = this.userForm.value.email
      this.userService.user.password = this.userForm.value.password
      await this.verifyEmailExisted()
    }
    window.scroll(0,0);
  }

  public async verifyEmailExisted(){
    let user = []
    
    await this.userService.getUserByEmailInApi(this.userService.user).pipe(takeUntil(this.unsubscribe$), take(1), map(v => user = v) ).toPromise()

    if(Object.keys(user).length != 0){
      await this.authentication()
    }else{
      this.active.text = `email ${this.userService.user.email} não esta cadastrado`
      this.active.message = true
      this.view.setLoader(false)
    }
  }

  public async authentication(){ 
    let userIsLogged = null
    await this.userService.signInWithEmailAndPasswordInApi(this.userService.user).then( v =>  userIsLogged = v ).catch(()=> userIsLogged = false )
    if(userIsLogged){
      this.userService.user.FOREIGN_KEY_UID = userIsLogged.uid
      await this.userService.getUserByEmailInApi(this.userService.user).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.userService.user = v[0]) ).toPromise()
      this.userService.setUserInState([this.userService.user])
      await this.userType()
    }else{
      this.active.text = "senha errada" 
      this.active.message = true
      this.view.setLoader(false)
    }
  }

  public async userType(){
    if(this.userService.user.type == 1){
      this.clientService.client.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
      await this.clientService.getClientByForeignKeyUserInApi(this.clientService.client).pipe(takeUntil(this.unsubscribe$), take(1), map( (v:any) => this.clientService.client = v[0]) ).toPromise()
      this.clientService.setClientInState([this.clientService.client])
      this.view.setUser('client')
      this.view.redirectPageFor('/home-client')
    }

    if(this.userService.user.type == 2){
       this.storeService.store.FOREIGN_KEY_USER = this.userService.pullUserInState().PRIMARY_KEY
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
