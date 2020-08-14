import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Core, User, Client } from '../../../../shared/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 

export class RegisterComponent implements OnDestroy {

  private unsubscribe$ = new Subject();

  public userForm: FormGroup = new FormGroup({
    'PRIMARY_KEY': new FormControl(null),
    'userName': new FormControl('saulo' ,Validators.required),
    'userEmail': new FormControl(null ,Validators.required),
    'password': new FormControl(null ,Validators.required),
    'retypePassword': new FormControl('123456789' ,Validators.required),
    'userType': new FormControl(1),
    'userTerms': new FormControl(true ,Validators.required)
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
    private redirectPageFor: Router
  ){}

  public validateForm(){
    this.userForm.get('userName').markAsTouched()
    this.userForm.get('userEmail').markAsTouched()
    this.userForm.get('password').markAsTouched()
    this.userForm.get('retypePassword').markAsTouched()
    this.userForm.get('userTerms').markAsTouched()

    if(this.userForm.value.retypePassword != this.userForm.value.password || (this.userForm.value.retypePassword == null || this.userForm.value.password == null)){
      this.active.text = "Senhas não são identicas"
      this.active.message = true
      this.active.formIsValid = false
    }else{
      this.active.formIsValid = true
    }

    if(!this.userForm.value.userName){
      this.active.text = "O Campo NOME é Obrigatorio"
      this.active.message = true
    }

    if(!this.userForm.value.userEmail){
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
    this.core.user.userEmail = this.userForm.value.userEmail
    this.core.user.password = this.userForm.value.password
    this.core.user.userType = 1
    
    let emailExisted = null
    await this.core.userService().getUserByEmailInApi(this.core.user).toPromise().then( v => emailExisted  ).catch(()=>emailExisted = null)

    console.log(emailExisted)

    if(emailExisted){
      this.active.text = "E-MAIL ja em uso" 
      this.active.message = true
      this.active.loading = false
      this.active.form = true
    }else{
      this.createNewUser()
    }
  }

  public async createNewUser(){
    let newUser:User
    await this.core.userService().createNewUserInApi(this.core.user).then( v => newUser = v )

    
    this.core.client.clientName = this.userForm.value.userName
    this.core.client.FOREIGN_KEY_USER = newUser.PRIMARY_KEY

    let newClient:Client
    await this.core.clientService().createNewClientInApi(this.core.client).then( v => newClient = v )

    this.core.userService().setUserInState([newUser])
    this.core.clientService().setClientInState([newClient])
    
    this.core.view.user = "client"
    this.redirectPageFor.navigate(['/product'])
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
