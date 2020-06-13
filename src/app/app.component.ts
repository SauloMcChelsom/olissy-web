import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './AuthService';
import { user } from './interfaces';
declare var $ :any


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

  public tela: string;

  public message:any;

  public url:boolean = false

  constructor(private appService: AppService,
              private authService: AuthService
              ) {}

              

  ngOnInit() {
    this.tela = this.appService.router_app_componet;
    this.token()
    this.getRouterPage()
    this.modalHide()

  }

  public modalHide(){
    // um cenário em que preciso exibir uma caixa de diálogo. Gostaria de permitir que o usuário retornasse para fechar a caixa de diálogo, pois é um comportamento muito comum no celular (especialmente no Android).
    //Quando isso acontece atualmente, a página vai para a página anterior. Em vez disso, preciso do botão para simplesmente descartar a caixa de diálogo.
    //95% dos usuários usam o botão voltar nos aplicativos em vez do botão X para fechar caixas de diálogo e sidenavs.
    //quando o modal esta aberto e o cliente enves de clicar em ocultar modal, clicar no botao voltar no smartphone
    //o modal e oculto forçado e poriço fica escuro e sem toque
    //este codigo faz

    //foi pressionado botap voltar, se sim
    $(window).on('popstate', function(event) {

      //seta variavel modal para alteracao
      var $modal = $('#displayComment');

      //se o modal for aberto aplicar esta funcao
      $modal.on('hidden.bs.modal', function(e) { 

        //desabelita botao de voltar
        //history.go(1);
        window.history.forward()
        console.log('window.history.forward()')
      });

      //ocultar botao
      $modal.modal('hide');


      //problema:
      //ele ficar na mesma pagian do modal aberto mas da refresh
    });
  }

  public getRouterPage(){
    let router = window.location.href.split('/' ) 
    if(router[3]  == 'login' || router[3]  == 'register'){
      this.url = true
    }else{
      this.url = false
    }
  }

  public token() {
    this.authService.isLogged().subscribe((res: any) => {
      if (res != null){
        this.authService.getByFOREIGN_KEY('user', res.uid).subscribe((user: [user]) => {
          if(Object.keys(user).length == 0){
          }else{
            if (user[0].userType === 1) {
              this.appService.router_app_componet = 'cliente';
            }
            if (user[0].userType === 2) {
              this.appService.router_app_componet = 'comercio';
            }
          }
        });
      }
    });
  }



  ngDoCheck() {
    this.tela = this.appService.router_app_componet;
    this.getRouterPage()
  }
}
