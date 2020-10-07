import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

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

  public client:Client = this.clientService.client()

  public userForm: FormGroup = this.createForm(this.userService.user());

  public active = {
    text: "",
    message:false,
  }

  constructor(
    private view: View,
    private userService:UserService,
    private clientService:ClientService,
    private fb: FormBuilder
  ){}

  public ngOnInit(){
    this.view.putLoader()
    window.scroll(0,0);
    this.setAvatar()
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
    let emailExisted = null
    await this.userService.getUserByEmailInApi(this.getForm()).pipe(takeUntil(this.unsubscribe$),take(1), map(v => emailExisted = v) ).toPromise()

    if(Object.keys(emailExisted).length == 0){
      this.createNewUser()
    }else{
      this.active.text = `email ${ this.userForm.value.email} ja em uso`
      this.active.message = true
      this.view.setLoader(false)
    }
  }

  public async createNewUser(){
    let newUser:User
    await this.userService.createNewUserWithEmailAndPasswordInApi(this.getForm()).then( v => newUser = v )

    this.client.name = this.userForm.value.name
    this.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    this.client.imageIconUrl = this.avatar
    await this.clientService.createNewClientInApi(this.client).then( v => newClient = v )

    this.userService.setUserInState([newUser])
    this.clientService.setClientInState([newClient])
    
    this.view.setUser('client')
    this.view.redirectPageFor('/client-home')
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
