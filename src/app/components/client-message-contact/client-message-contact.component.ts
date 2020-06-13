import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientMessageContactService } from './client-message-contact.service'
import { AuthService } from '../../AuthService';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-client-message-contact',
  templateUrl: './client-message-contact.component.html',
  styleUrls: ['./client-message-contact.component.css']
})
export class ClientMessageContactComponent implements OnInit, OnDestroy {

  constructor(private ClientMessageContactService:ClientMessageContactService, private authService:AuthService) { }

  public newMessage:null
  public ConversationView:null
  public contact:null
  public client = { clientImageUrl:'/assets/plataform/avatar.png', clientName:"...", clientLastName:"...", clientCellPhone:"...", clientCity:"..."}
  public perfils:null 
  private unsubscribe$ = new Subject();
  private FOREIGN_KEY_CLIENT:string

  ngOnInit() {
    this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
      this.FOREIGN_KEY_CLIENT = isLogged.uid
      this.getNewMessage()
      this.getConversationView()
      this.getContact()
      this.getClient()
    })
  }
 
  public isLogged() {
    return  this.authService.isLogged()
  }

  public getNewMessage(){
    this.ClientMessageContactService.getNewMessageByFOREIGN_KEY(this.FOREIGN_KEY_CLIENT).pipe(takeUntil(this.unsubscribe$)).subscribe((newMessage:any)=>{
      this.newMessage = newMessage
    })
  }

  public getConversationView(){
    this.ClientMessageContactService.getConversationByFOREIGN_KEY(this.FOREIGN_KEY_CLIENT).pipe(takeUntil(this.unsubscribe$)).subscribe((ConversationView:any)=>{
      this.ConversationView = ConversationView
    })
  }

  public getContact(){
    this.ClientMessageContactService.getContactByFOREIGN_KEY(this.FOREIGN_KEY_CLIENT).pipe(takeUntil(this.unsubscribe$)).subscribe((contact:any)=>{
      this.contact = contact
    })
  }

  public getClient(){
    this.ClientMessageContactService.getClientByFOREIGN_KEY(this.FOREIGN_KEY_CLIENT).pipe(takeUntil(this.unsubscribe$)).subscribe((client:any)=>{
      this.client = client[0]
      console.log(this.client)
    })
  }

  public countNewMensage(msn:any):number{
    let numberOfNewMessage:number = 0
    for (const key of msn) {
      if(key.FOREIGN_KEY != this.FOREIGN_KEY_CLIENT && key.view == false){
        numberOfNewMessage++
      }
    }
    return numberOfNewMessage
  }

  public showLestNewMensage(msn:any):string{
    let LestMensage:string
    for (const key of msn) {
      if(key.FOREIGN_KEY != this.FOREIGN_KEY_CLIENT && key.view == false){
        LestMensage = key.text
      }
    }
    return LestMensage
  }  

  public showLestMensage(msn:any):string{
    let LestMensage:string = "..........."
    if(typeof msn === 'object'){
      for (const key of msn) {
        if(key.FOREIGN_KEY != this.FOREIGN_KEY_CLIENT){
          LestMensage = key.text
        }
        if(key.FOREIGN_KEY == this.FOREIGN_KEY_CLIENT){
          LestMensage = key.text
        }
      }
    }
    return LestMensage
  }

  public faCheckMensage(msn):boolean{
    let checkMensage:boolean = null
    if(typeof msn === 'object'){
      for (const key of msn) {
        if(key.FOREIGN_KEY == this.FOREIGN_KEY_CLIENT && key.view == true){
          checkMensage = true
        }
        if(key.FOREIGN_KEY == this.FOREIGN_KEY_CLIENT && key.view == false){
          checkMensage = false
        }
        if(key.FOREIGN_KEY != this.FOREIGN_KEY_CLIENT){
          checkMensage = null
        }
      }
    }
    return checkMensage
  }

  public ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}