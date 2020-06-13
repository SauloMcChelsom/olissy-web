import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from '../../app.service'
import { AuthService  } from '../../AuthService';
import { LoginService  } from './login.service';
import { user } from '../../interfaces';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public formulario: FormGroup = new FormGroup({
    'userEmail': new FormControl(null,Validators.required),
    'password': new FormControl(null,Validators.required),
    'Remember_me': new FormControl(false)
  })

  public mensagem = {
    mensagem: "",
    status: false,
    senha: false,
    termos:false,
    loading:true
  }

  public tela:string

  constructor(private appService: AppService,
              private loginService:LoginService,
              private authService: AuthService,
              private router_navigator: Router) {}

  ngOnInit() {
    this.tela = this.appService.router_app_componet
  }

  public authentication(){
    this.formulario.get('userEmail').markAsTouched()
    this.formulario.get('password').markAsTouched()

    if(this.formulario.get('password').invalid){
      this.mensagem.mensagem = "Por favor Preencher campo senha"
      this.mensagem.status = true
    }

    if(this.formulario.get('userEmail').invalid){
      this.mensagem.mensagem = "Por favor Preencher campo email"
      this.mensagem.status = true
    }

    if(this.formulario.valid){
      this.mensagem.loading = false
      this.authService.login(this.formulario.value.Remember_me, this.formulario.value.userEmail, this.formulario.value.password).then((resposta)=>{
        this.mensagem.mensagem = ""
        this.mensagem.status = false
        this.formulario.reset
        this.loginService.getByFOREIGN_KEY('user',resposta.user.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((resposnta:[user])=>{
          if(resposnta[0].userType == 2){
            this.appService.router_app_componet = 'comercio'
            this.router_navigator.navigate(['/product']);
          }
          if(resposnta[0].userType == 1){
            this.appService.router_app_componet = 'cliente'
            this.router_navigator.navigate(['/product']);
          }
        })
      }).catch((resposta)=>{
        if(resposta.code == "auth/invalid-email"){
          this.mensagem.mensagem = "O endereço de email e invalido"
          this.mensagem.status = true
          this.mensagem.loading = true
        }
        if(resposta.code == "auth/wrong-password"){
          this.mensagem.mensagem = "Senha esta errada"
          this.mensagem.status = true
          this.mensagem.loading = true
        }
        if(resposta.code == "auth/user-not-found"){
          this.mensagem.mensagem = "Usuario não Existe"
          this.mensagem.status = true
          this.mensagem.loading = true
        }
      })
    }
  }

  public authenticationByGoogle(){
    this.authService.authenticationByGoogle()
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
