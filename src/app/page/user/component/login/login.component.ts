import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Core } from '../../../../shared/core';

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
    message:false,
    form:true,
    loading:false
  }

  constructor(
    private redirectPageFor: Router,
    private core:Core
  ){}

  public async ngOnInit() {}

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
      this.active.loading = true
      this.active.form = false

      this.core.user.email = this.userForm.value.email
      this.core.user.password = this.userForm.value.password
      await this.verifyEmailExisted()
    }
  }

  public async verifyEmailExisted(){
    let user = null
    
    await this.core.userService().getUserByEmailInApi(this.core.user).pipe(takeUntil(this.unsubscribe$), map(v => user = v) ).toPromise()

    if(Object.keys(user).length != 0){
      await this.authentication()
    }else{
      this.active.text = `email ${this.core.user.email} não esta cadastrado`
      this.active.message = true
      this.active.loading = false
      this.active.form = true
    }
  }

  public async authentication(){ 
    let userIsLogged = null
    await this.core.userService().signInWithEmailAndPasswordInApi(this.core.user).then( v =>  userIsLogged = v ).catch(()=> userIsLogged = false )
    if(userIsLogged){
      this.core.user.FOREIGN_KEY_UID = userIsLogged.uid
      await this.core.userService().getUserByEmailInApi(this.core.user).pipe(takeUntil(this.unsubscribe$), map( (v:any) => this.core.user = v[0]) ).toPromise()
      this.core.userService().setUserInState([this.core.user])
      await this.userType()
    }else{
      this.active.text = "senha errada" 
      this.active.message = true
      this.active.loading = false
      this.active.form = true
    }
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
