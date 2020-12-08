import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

import { Subject } from 'rxjs';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { Client, ClientService } from '../../../../service/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 

export class RegisterComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public avatar:string = null

  public client:Client = this.clientService.client

  public userForm: FormGroup = this.createForm(this.userService.user);

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
      //var storage = firebase.storage();
      //await storage.ref('plataform/avatar.png').getDownloadURL().then(url => this.avatar = url )
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
      this.verifyEmailExisted()
    }
    window.scroll(0,0);
  }

  public async verifyEmailExisted(){
   
    let errorServer:boolean = false
    let email:any = [{existed:true}]

    await this.userService.emailInformedExistsInApi(this.getForm()).then( 
      ((res)=>{email = res}),
      ((err)=>{errorServer = true})
    ).finally(
      ()=>{} 
    )

    if(email[0].existed == false){
      this.createNewUser()
      this.active.text = `email valido para o registro`
    }else{
      //this.active.text = `email ${ this.userForm.value.email} ja em uso`
      this.active.text = `O endereço de e-mail ${ this.userForm.value.email} já está sendo usado por outra conta.<br \/><br \/> Caso seja dono deste e-mail, ou se esqueceu da sua senha. <br \/><br \/> <a href=\"https://www.olissy.com/recuperar-email\"\/>Clicar aqui para recupera-lo<\/a>`
      this.active.message = true
      this.view.setLoader(false)
      if(errorServer){
       this.active.text = 'Error na comunicação com o servidor, GUARDE! estamos trabalhando nisso'
      }
    }
  }

  public async createNewUser(){
    let newUser:User
    await this.userService.createNewUserWithEmailAndPasswordInFirebaseInApi(this.getForm()).then( 
      (async(res)=>{newUser = res, await this.createNewAccount(newUser)}),
      ((err)=>{
        this.active.text = `Houve um erro inesperado ao criar um usuario, Por favor tente novamente`
        if(err.code == 'auth/email-already-in-use'){
          this.active.text = "O endereço de e-mail já está sendo usado por outra conta.<br \/><br \/> Caso seja dono deste e-mail, ou se esqueceu da sua senha. <br \/><br \/> <a href=\"https://www.olissy.com/recuperar-email\"\/>Clicar aqui para recupera-lo<\/a>"
         }
        this.active.message = true
        this.view.setLoader(false)
      })
    ).finally(
      ()=>{} 
    )
  }

  public async createNewAccount(newUser){
    await this.userService.createNewAccountInOlisyInApi(newUser).then(
      ((res)=>{
        if(res[0].status_message == 'CREATE_NEW_ACCOUNT_SUCCESS'){
          this.accountCreateWithSuccess(res, newUser)
        }else{
          this.active.text = `Erro em criar sua conta, atualiza a pagina e tente novamente.<br \/><br \/> Codigo do erro caso precise<br \/><br \/>${res[0].status_message}`
          this.active.message = true
          this.view.setLoader(false)
          this.userService.deleteUserInFirebaseInApi()
        } 
      }),
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
    ).finally(
      ()=>{} 
    )
  }

  public async accountCreateWithSuccess(newAccount, newUser){

   await this.userService.incrementInApi()

    let newClient:Client = this.clientService.client
    newClient.primary_key = newAccount[0].primary_key_client
    newClient.foreign_key_user = newAccount[0].primary_key_user

    this.userService.setUserInState([newUser])
    this.clientService.setClientInState([newClient])
    
    this.view.setUser('client')

    if(this.userHaveOrderInOpen())
    this.view.redirectPageFor('/client-home')
  }

  public userHaveOrderInOpen():Boolean{
    if(localStorage.getItem('order') != null){
      this.view.redirectPageFor('/client-create-order')
      return false
    }
    return true
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
