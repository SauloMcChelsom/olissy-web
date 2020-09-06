import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';

import firebase from '@firebase/app';
import '@firebase/storage';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators'

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';


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
    name: new FormControl(null ,Validators.required),
    email: new FormControl(null ,Validators.required),
    password: new FormControl(null ,Validators.required),
    retypePassword: new FormControl(null ,Validators.required),
    type: new FormControl(1),
    terms: new FormControl(false ,Validators.required)
  })

  public active = {
    text: "",
    message:false,
  }

  constructor(
    private view: View,
    private userService:UserService,
    private clientService:ClientService,
  ){}

  public ngOnInit(){
    window.scroll(0,0);
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
    this.active.message = false
    this.userForm.get('name').markAsTouched()
    this.userForm.get('email').markAsTouched()
    this.userForm.get('password').markAsTouched()
    this.userForm.get('retypePassword').markAsTouched()
    this.userForm.get('terms').markAsTouched()

    if(!this.userForm.value.terms){
      this.active.text = "Aceite os termos"
      this.active.message = true
    }

    if(this.userForm.value.retypePassword != this.userForm.value.password || (this.userForm.value.retypePassword == null || this.userForm.value.password == null)){
      this.active.text = "Senhas não são identicas"
      this.active.message = true
    }

    if(!this.userForm.value.email){
      this.active.text = "O Campo E-MAIL é Obrigatorio"
      this.active.message = true
    }

    if(!this.userForm.value.name){
      this.active.text = "O Campo NOME é Obrigatorio"
      this.active.message = true
    }

    if(this.userForm.valid &&  this.active.message == false){
      this.active.message = false
      this.view.setLoader(true)
      this.verifyEemailExisted()
    }
    window.scroll(0,0);
  }

  public async verifyEemailExisted(){
    this.userService.user.email = this.userForm.value.email
    this.userService.user.password = this.userForm.value.password
    this.userService.user.name = this.userForm.value.name
    this.userService.user.terms = true
    this.userService.user.type = 1

    let emailExisted = null
    await this.userService.getUserByEmailInApi(this.userService.user).pipe(takeUntil(this.unsubscribe$),take(1), map(v => emailExisted = v) ).toPromise()

    if(Object.keys(emailExisted).length == 0){
      this.createNewUser()
    }else{
      this.active.text = `email ${ this.userService.user.email} ja em uso`
      this.active.message = true
      this.view.setLoader(false)
    }
  }

  public async createNewUser(){
    let newUser:User
    await this.userService.createNewUserWithEmailAndPasswordInApi(this.userService.user).then( v => newUser = v )

    this.clientService.client.name = this.userForm.value.name
    this.clientService.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    this.clientService.client.imageIconUrl = this.avatar
    await this.clientService.createNewClientInApi(this.clientService.client).then( v => newClient = v )

    this.userService.setUserInState([newUser])
    this.clientService.setClientInState([newClient])
    
    this.view.setUser('client')
    this.view.redirectPageFor('/home-client')
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
