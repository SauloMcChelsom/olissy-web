import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { ClientMessageTextService } from './client-message-text.service'
import { ActivatedRoute } from '@angular/router'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../AuthService';
declare var $ :any;

@Component({
  selector: 'app-client-message-text',
  templateUrl: './client-message-text.component.html',
  styleUrls: ['./client-message-text.component.css']
})
export class ClientMessageTextComponent implements OnInit, OnDestroy {

  constructor(private ClientMessageTextService:ClientMessageTextService, 
              private route:ActivatedRoute,
              private authService:AuthService) { }

  private unsubscribe$ = new Subject();
  public  header = { nameContact:null, photoContact: null}
  public  mensagem:any
  private FOREIGN_KEY_CLIENT:string
  private client = { name:"", photo:""}

  public formularioMessage: FormGroup = new FormGroup({
    "message": new FormControl(null),
  })

  public ngOnInit() {
    this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
      this.FOREIGN_KEY_CLIENT = isLogged.uid
      this.getClient()
      this.getMessage()
    })
  } 
 
  public isLogged() {
    return  this.authService.isLogged()
  }

  public getClient(){
    this.ClientMessageTextService.getClientByFOREIGN_KEY("client", this.FOREIGN_KEY_CLIENT).pipe(takeUntil(this.unsubscribe$)).subscribe((client:any)=>{
      this.client.name = client[0].clientName +" "+ client[0].clientLastName
      this.client.photo = client[0].clientImageUrl
    })
  }

  public getMessage(){
     this.ClientMessageTextService.getMessageByFOREIGN_KEY(this.route.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((mensagem:any)=>{
      this.mensagem = mensagem[0]
      this.header.nameContact = mensagem[0].nameStore
      this.header.photoContact = mensagem[0].photoStore
      this.marcarMensagemVisualizada()
    })
  }

  public marcarMensagemVisualizada(){
    let message = []
    let messageMarcada = []
    let auterar:boolean = false
    if(this.mensagem.message != null){
      message.push(this.mensagem.message)
      for (const key of message) {
        for (const keys of key) {
          messageMarcada.push(keys)
        }
      }
      for (const key of messageMarcada) {
        if(key.FOREIGN_KEY != this.FOREIGN_KEY_CLIENT && key.view == false){
          console.log(key.view, key.FOREIGN_KEY,  key.message)
          key.view = true
          auterar = true
        }
      }
    } 
    if(auterar){
      this.ClientMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { 'message' : messageMarcada } )
      this.ClientMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { viewStore : false } )
    }
    this.scroll()
  }

  public sendMessage(){
    if(this.formularioMessage.get("message").valid){
      let message = {
        name : this.client.name,
        text : this.formularioMessage.get("message").value,
        view : false,
        data : `${new Date()}`,
        photo : this.client.photo,
        FOREIGN_KEY : this.FOREIGN_KEY_CLIENT
      }
      this.ClientMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { viewClient : true } )
      this.ClientMessageTextService.sendMessage(this.mensagem.PRIMARY_KEY, message)
      this.scroll()
    }
    this.formularioMessage.reset()
  }

  public scroll(){
    setTimeout(() => {
      $('html, body').animate({scrollTop:$(document).height()-$(window).height()}, 'slow');
    }, 1000);
  }

  public formatarDataTime(d){
    let data = new Date(d)
    let my = data.toLocaleString([], { hour12: true})
    return my
  } 

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
