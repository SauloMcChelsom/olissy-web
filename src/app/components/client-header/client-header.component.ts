import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from "../../data.service";
import { AppService } from '../../app.service'
import { AuthService  } from '../../AuthService'
import { client, user } from '../../interfaces';
import { ClientHeaderService } from './client-header.service'
declare var $ :any;

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})

export class ClientHeaderComponent implements OnInit , OnDestroy{

  private unsubscribe$ = new Subject();

  public usuario:user

  public cliente:client = {clientImageUrl : "/assets/plataform/avatar.png"}

  public pedidos:any;

  public token:any = ""

  public newMessage

  constructor(private appservice: AppService,
              private clienteHeaderService: ClientHeaderService,
              private router_navigator:Router,
              private authService: AuthService,
              private data: DataService ) {}

  async ngOnInit() {
    await this.obterDadosToken()
    this.obterDadosCliente()
    this.obterDadosPedidos()
    this.getNewMessage()
  }

  public async obterDadosToken(){
    this.authService.isLogged().subscribe((res:any)=>{
      this.token = res
    })
  }

  public obterDadosCliente(){
    this.clienteHeaderService.getClientByFOREIGN_KEY('client',this.token.uid, 1).pipe(takeUntil(this.unsubscribe$)).subscribe( (dados:[client])=>{
      this.cliente = dados[0]
    })
  }

  public obterDadosPedidos(){
    this.clienteHeaderService.getByProdutoFOREIGN_KEY('order', this.token.uid).pipe(takeUntil(this.unsubscribe$)).subscribe( (dados)=>{
      this.pedidos = dados
    })
  }

  public SignOut(){
    this.appservice.router_app_componet = 'usuario'
    this.authService.logout()
    this.router_navigator.navigateByUrl('/login')
  }

  public getNewMessage(){
    this.clienteHeaderService.getNewMessageByFOREIGN_KEY(this.token.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((newMessage:any)=>{
      this.newMessage = newMessage
    })
  }
 
  searchProductDB_Output(productDB){
    $('#displaySearch').modal('hide'); 
    this.data.setProductDB(productDB)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
