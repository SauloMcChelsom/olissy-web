import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { StoreMessageTextService } from './store-message-text.service'
import { ActivatedRoute } from '@angular/router'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../AuthService';
declare var $ :any;

@Component({
  selector: 'app-store-message-text',
  templateUrl: './store-message-text.component.html',
  styleUrls: ['./store-message-text.component.css']
})
export class StoreMessageTextComponent implements OnInit, OnDestroy {

  constructor(private StoreMessageTextService:StoreMessageTextService, 
              private route:ActivatedRoute,
              private authService:AuthService) { }


    public header = { nameContact:null, photoContact: null}
    public mensagem:any
    private unsubscribe$ = new Subject();
    private FOREIGN_KEY_STORE:string
    private store = { name:"", photo:""}
  
    public formularioMessage: FormGroup = new FormGroup({
      "message": new FormControl(null),
    })
  
    ngOnInit() {
      this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
        this.FOREIGN_KEY_STORE = isLogged.uid
        this.getStore()
        this.getMessage()
      })
    } 
    
    public isLogged() {
      return  this.authService.isLogged()
    }
  
    getStore(){
      this.StoreMessageTextService.getStoreByFOREIGN_KEY("store", this.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        this.store.name = store[0].storeName
        this.store.photo = store[0].storeImageUrl
      })
    }
  
    getMessage(){
      this.StoreMessageTextService.getMessageByFOREIGN_KEY(this.route.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((mensagem:any)=>{
        this.mensagem = mensagem[0]
        this.header.nameContact = mensagem[0].nameClient
        this.header.photoContact = mensagem[0].photoClient
        this.marcarMensagemVisualizada()
      })
    }

    marcarMensagemVisualizada(){
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
          if(key.FOREIGN_KEY != this.FOREIGN_KEY_STORE && key.view == false){
            key.view = true
            auterar = true
          }
        }
      }
  
      if(auterar){
        this.StoreMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { 'message' : messageMarcada } )
        //this.StoreMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { viewClient : false } )
        this.StoreMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { viewClient : false } )
      }

      this.scroll()
    }
  
    sendMessage(){
      if(this.formularioMessage.get("message").valid){
      let message = {
        name : this.store.name,
        text : this.formularioMessage.get("message").value,
        view : false,
        data : `${new Date()}`,
        photo : this.store.photo,
        FOREIGN_KEY : this.FOREIGN_KEY_STORE
      }
      this.StoreMessageTextService.markMessageHowViewed('contact', this.mensagem.PRIMARY_KEY, { viewStore : true } )
      this.StoreMessageTextService.sendMessage(this.mensagem.PRIMARY_KEY, message)
         
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
  