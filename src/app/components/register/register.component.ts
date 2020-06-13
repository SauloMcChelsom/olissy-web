import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService  } from '../../AuthService';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public formulario: FormGroup = new FormGroup({
    'PRIMARY_KEY': new FormControl(null),
    'FOREIGN_KEY': new FormControl(null),
    'userName': new FormControl(null ,Validators.required),
    'userEmail': new FormControl(null ,Validators.required),
    'password': new FormControl(null ,Validators.required),
    'retypePassword': new FormControl(null ,Validators.required),
    'userType': new FormControl(1),
    'userTerms': new FormControl(false ,Validators.required)
  })

  public mensagem = {
    mensagem: "",
    status: false,
    senha: false,
    termos:false,
    loading:true
  }

  constructor(private appService: AppService,
              private authService: AuthService,
              private router_navigator: Router) {}

  ngOnInit() {}

  public ValidarCadastro(){
    this.mensagem.status = false
    this.formulario.get('userName').markAsTouched()
    this.formulario.get('userEmail').markAsTouched()
    this.formulario.get('password').markAsTouched()
    this.formulario.get('retypePassword').markAsTouched()
    this.formulario.get('userTerms').markAsTouched()

    if(this.formulario.value.retypePassword != this.formulario.value.password || (this.formulario.value.retypePassword == null || this.formulario.value.password == null)){
      this.mensagem.mensagem = "Senhas não são identicas"
      this.mensagem.status = true
      this.mensagem.senha = false
    }else{
      this.mensagem.senha = true
    }

    if(!this.formulario.value.userTerms){
      this.mensagem.mensagem = "O Campo TERMOS é Obrigatorio"
      this.mensagem.status = true
      this.mensagem.termos = false
    }else{
      this.mensagem.termos = true
    }

    if(!this.formulario.value.userName){
      this.mensagem.mensagem = "O Campo NOME é Obrigatorio"
      this.mensagem.status = true
      this.mensagem.termos = false
    }else{
      this.mensagem.termos = true
    }

    if(!this.formulario.value.userEmail){
      this.mensagem.mensagem = "O Campo E-MAIL é Obrigatorio"
      this.mensagem.status = true
      this.mensagem.termos = false
    }else{
      this.mensagem.termos = true
    }

    if(this.formulario.valid &&  this.mensagem.senha && this.mensagem.termos){
      this.mensagem.mensagem = ""
      this.mensagem.status = false
      this.Cadastro()
    }
  }

  public Cadastro(){
    this.mensagem.loading = false
      this.authService.registration(this.formulario.value).then((resposta)=>{
        this.mensagem.mensagem = ""
        this.mensagem.status = false
        this.mensagem.loading = true
        this.authService.login(false,   this.formulario.get('userEmail').value, this.formulario.get('password').value).then((resposta)=>{
          this.formulario.reset
          this.appService.router_app_componet = 'cliente'
          this.router_navigator.navigate(['/product']);
      })
    }).catch((resposta)=>{
      if(resposta.code == "auth/invalid-email"){
        this.mensagem.mensagem = "O endereço de email e invalido"
        this.mensagem.status = true
        this.mensagem.loading = true
      }
      if(resposta.code == "auth/weak-password"){
        this.mensagem.mensagem = "Senha deve ter no minimo 6 caracter"
        this.mensagem.status = true
        this.mensagem.loading = true
      }
      if(resposta.code == "auth/email-already-in-use"){
        this.mensagem.mensagem = "O endereço de e-mail já está sendo usado por outra conta"
        this.mensagem.status = true
        this.mensagem.loading = true
      }
    })
  }

  public authenticationByGoogle(){
    this.authService.authenticationByGoogle()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
