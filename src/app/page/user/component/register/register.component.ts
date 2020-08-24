import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Router } from '@angular/router';

import firebase from '@firebase/app';
import '@firebase/storage';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators'

import { Core, User, Client } from '../../../../shared/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 

export class RegisterComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public avatar:string = null

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
    loading:false,
    formIsValid:false
  }

  constructor(
    private core:Core,
    private redirectPageFor: Router,
  ){}

  public ngOnInit(){
    this.setAvatar()
  }

  private async setAvatar(){
    const avatar =  localStorage.getItem('avatar')
    if(avatar){
      this.avatar = avatar
    }else{
      var storage = firebase.storage();
      await storage.ref('plataform/avatar.png').getDownloadURL().then(url => this.avatar = url )
      localStorage.setItem('avatar', this.avatar)
    }
  }
  
  public validateForm(){
    this.userForm.get('name').markAsTouched()
    this.userForm.get('email').markAsTouched()
    this.userForm.get('password').markAsTouched()
    this.userForm.get('retypePassword').markAsTouched()
    this.userForm.get('terms').markAsTouched()

    if(this.userForm.value.retypePassword != this.userForm.value.password || (this.userForm.value.retypePassword == null || this.userForm.value.password == null)){
      this.active.text = "Senhas não são identicas"
      this.active.message = true
      this.active.formIsValid = false
    }else{
      this.active.formIsValid = true
    }

    if(!this.userForm.value.name){
      this.active.text = "O Campo NOME é Obrigatorio"
      this.active.message = true
    }

    if(!this.userForm.value.email){
      this.active.text = "O Campo E-MAIL é Obrigatorio"
      this.active.message = true
    }

    if(this.userForm.valid &&  this.active.formIsValid){
      this.active.message = false
      this.active.loading = true
      this.active.form = false
      this.verifyEemailExisted()
    }
  }

  public async verifyEemailExisted(){
    this.core.user.email = this.userForm.value.email
    this.core.user.password = this.userForm.value.password
    this.core.user.name = this.userForm.value.name
    this.core.user.terms = true
    this.core.user.type = 1
    
    let emailExisted = null
    await this.core.userService().getUserByEmailInApi(this.core.user).pipe(takeUntil(this.unsubscribe$),take(1), map(v => emailExisted = v) ).toPromise()

    if(Object.keys(emailExisted).length == 0){
      this.createNewUser()
    }else{
      this.active.text = `email ${ this.core.user.email} ja em uso`
      this.active.message = true
      this.active.loading = false
      this.active.form = true
    }
  }

  public async createNewUser(){
    let newUser:User
    await this.core.userService().createNewUserWithEmailAndPasswordInApi(this.core.user).then( v => newUser = v )

    this.core.client.name = this.userForm.value.name
    this.core.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    this.core.client.imageIconUrl = this.avatar
    await this.core.clientService().createNewClientInApi(this.core.client).then( v => newClient = v )

    this.core.userService().setUserInState([newUser])
    this.core.clientService().setClientInState([newClient])
    
    this.core.view.user = "client"
    this.redirectPageFor.navigate(['/home'])
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
