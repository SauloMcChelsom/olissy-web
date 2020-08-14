import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Core, User } from '../../../../shared/core';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public userForm: FormGroup = new FormGroup({
    'userEmail': new FormControl(null,Validators.required),
    'password': new FormControl(null,Validators.required),
    'Remember_me': new FormControl(false)
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

  public ngOnInit() {
   
  }

  public async validateForm(){
    this.core.user.password = '123456789'
    console.log('user: ',this.core.user)
    this.userForm.get('userEmail').markAsTouched()
    this.userForm.get('password').markAsTouched()

    if(this.userForm.get('password').invalid){
      this.active.text = "Por favor Preencher campo senha"
      this.active.message = true
    }

    if(this.userForm.get('userEmail').invalid){
      this.active.text = "Por favor Preencher campo email"
      this.active.message = true
    }

    if(this.userForm.valid){
      this.active.message = false
      this.active.loading = true
      this.active.form = false

      this.core.user.userEmail = this.userForm.value.userEmail
      this.core.user.password = this.userForm.value.password
      await this.verifyEmailExisted()
    }
  }

  public async verifyEmailExisted(){
    let emailExisted = null
    await this.core.userService().getUserByEmailInApi(this.core.user).toPromise().then( v => emailExisted = v[0]).catch(()=>emailExisted = undefined)
   
    if(emailExisted){
      emailExisted = null
      await this.authentication()
    }else{
      this.active.text = "E-MAIL nao existe" 
      this.active.message = true
      this.active.loading = false
      this.active.form = true
    }
  }

  public async authentication(){ 
    let userIsLogged = null
    await this.core.userService().signInWithEmailAndPasswordInApi(this.core.user).then( v => userIsLogged = v[0] ).catch(()=>userIsLogged = undefined)

    if(userIsLogged){
      this.core.user.FOREIGN_KEY_UID = userIsLogged.FOREIGN_KEY_UID
      userIsLogged = null
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
    if(this.core.user.userType == 1){
      this.core.client.FOREIGN_KEY_USER = this.core.userService().pullUserInState().PRIMARY_KEY
      await this.core.clientService().getClientByForeignKeyUserInApi(this.core.client).toPromise().then( (v:any) => this.core.client = v[0] )
      this.core.clientService().setClientInState([this.core.client])
      this.core.view.user = "client"
      this.redirectPageFor.navigate(['/product'])
    }

    if(this.core.user.userType == 2){
      this.core.store.FOREIGN_KEY_USER = this.core.userService().pullUserInState().PRIMARY_KEY
      await this.core.storeService().getStoreByForeignKeyUserInApi(this.core.store).toPromise().then( (v:any) => this.core.store = v[0] )
      this.core.storeService().setStoreInState(this.core.store)
      this.core.view.user = "store"
      this.redirectPageFor.navigate(['/product'])
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
